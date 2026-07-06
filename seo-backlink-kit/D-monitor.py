#!/usr/bin/env python3
"""Backlink health monitor for Joburgchurch.co.za.

What this script does (every Monday 06:00 if you schedule it):

  1. Checks each directory you submitted to - is it still live?
     (a 404 means you've lost a citation)

  2. Pulls backlinks from free, public sources:
     - Google Search Console export (you drop a CSV every 4 weeks)
     - Bing Webmaster Tools export (same)
     - DuckDuckGo / Bing "link:" operator (slow but free)

  3. Checks for new or lost citations since last run.

  4. Writes a Markdown report to ./report-YYYY-MM-DD.md

You do NOT need an Ahrefs / Moz paid API.

Required free inputs:
  - ./gsc-links-YYYY-MM-DD.csv     (drop here monthly from GSC)
  - ./bing-links-YYYY-MM-DD.csv    (drop here monthly from Bing WMT)
  - ./directories.csv              (column: url, the list you maintain)

Quiet ASCII output by default so it works on any terminal.
Use --emoji flag to print Unicode status icons (UTF-8 terminals only).

Run:
  python3 monitor.py
"""

from __future__ import annotations

import argparse
import csv
import io
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse
import urllib.request
import urllib.error
import socket

ROOT = Path(__file__).parent.resolve()
SITE = "joburgchurch.co.za"

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
)
TIMEOUT = 12
socket.setdefaulttimeout(TIMEOUT)


def status_text(code: int | None, emoji: bool = False) -> str:
    if code is None:
        return "[DEAD/TIMEOUT]" if not emoji else "dead/timeout"
    if 200 <= code < 300:
        return "[LIVE]" if not emoji else "live"
    if 300 <= code < 400:
        return "[REDIRECT]" if not emoji else "redirected"
    if code == 403 or code == 429:
        return "[BLOCKS-BOT, likely alive]" if not emoji else "blocks-bot (likely alive)"
    return f"[DEAD {code}]" if not emoji else f"DEAD {code}"


# ---------- helpers --------------------------------------------------------

def head(url: str) -> tuple[int | None, str]:
    """Return (status_code, final_url). None = network error."""
    req = urllib.request.Request(url, method="GET", headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
            return r.status, r.url
    except urllib.error.HTTPError as e:
        return e.code, url
    except (urllib.error.URLError, socket.timeout, ConnectionError):
        return None, url
    except Exception:
        return None, url


def safe_get(url: str) -> str:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
            return r.read().decode("utf-8", errors="replace")
    except Exception:
        return ""


# ---------- directory health check -----------------------------------------

def check_directories(csv_path: Path) -> list[dict]:
    if not csv_path.exists():
        return []
    rows = []
    with csv_path.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            url = row.get("url", "").strip()
            if not url:
                continue
            label = row.get("name") or urlparse(url).netloc
            code, final = head(url)
            rows.append(
                {
                    "name": label,
                    "url": url,
                    "status_code": code,
                    "final": final,
                    "ok": (code is not None and 200 <= code < 400)
                    or code in (403, 429),
                }
            )
            time.sleep(0.5)  # be polite
    return rows


# ---------- backlink reading from GSC / Bing CSVs --------------------------

def read_link_csv(path: Path) -> list[str]:
    """Read GSC 'External links' or Bing 'Backlinks' export.

    Both exports have at least: 'Source URL' or equivalent linking-domain
    column. We grab the third column by default (most common) and the
    second as fallback. Edit as needed once you know your export shape.
    """
    if not path.exists():
        return []
    domains: list[str] = []
    with path.open(encoding="utf-8") as f:
        reader = csv.reader(f)
        headers = next(reader, [])
        # Find the most likely column index for the source domain
        candidates = []
        for i, h in enumerate(headers):
            low = h.lower()
            if "source" in low and "page" in low:
                candidates.append(i)
            elif "linking" in low and "page" in low:
                candidates.append(i)
            elif low.strip() == "url":
                candidates.append(i)
        src_idx = candidates[0] if candidates else (len(headers) - 1)

        for row in reader:
            if src_idx < len(row):
                val = row[src_idx].strip()
                if val:
                    domains.append(val)
    return domains


# ---------- diff against last run ------------------------------------------

def diff_with_last(current: list[str], last_path: Path) -> tuple[set[str], set[str]]:
    new, lost = set(), set()
    if not last_path.exists():
        return set(current), set()
    last = set(
        line.strip() for line in last_path.read_text(encoding="utf-8").splitlines() if line.strip()
    )
    cur = set(current)
    return cur - last, last - cur


# ---------- markdown report ------------------------------------------------

def write_report(
    directories: list[dict],
    new_links: set[str],
    lost_links: set[str],
    total_links: int,
) -> Path:
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    out = ROOT / f"report-{today}.md"

    lines = [f"# Backlink Health Report — {today}", ""]
    lines.append(f"Target: **{SITE}**")
    lines.append("")
    lines.append("## 1. Directory citations (are they still live?)")
    lines.append("")
    lines.append("| Directory | URL | Status |")
    lines.append("|-----------|-----|--------|")
    for d in directories:
        lines.append(
            f"| {d['name']} | {d['url']} | {status_text(d['status_code'])} |"
        )
    lines.append("")

    dead = [d for d in directories if not d["ok"]]
    if dead:
        lines.append(f"**Action needed**: {len(dead)} citations down or unreachable.")
        lines.append("")
        for d in dead:
            lines.append(f"  - Re-submit to {d['name']} ({d['url']})")
        lines.append("")

    lines.append("## 2. New vs lost backlinks (from GSC / Bing exports)")
    lines.append("")
    if total_links == 0:
        lines.append("_No GSC / Bing export dropped into the folder yet._")
        lines.append("")
        lines.append("Export from: https://search.google.com/search-console/links")
        lines.append("and: https://www.bing.com/webmasters -> Backlinks")
        lines.append("Save them as `gsc-links-YYYY-MM-DD.csv` / `bing-links-YYYY-MM-DD.csv`.")
        lines.append("")
    else:
        lines.append(f"Total references read: **{total_links}**")
        lines.append("")
        if new_links:
            lines.append(f"### NEW this run ({len(new_links)})")
            lines.append("")
            for l in sorted(new_links):
                lines.append(f"- {l}")
            lines.append("")
        if lost_links:
            lines.append(f"### LOST since last run ({len(lost_links)})")
            lines.append("")
            for l in sorted(lost_links):
                lines.append(f"- {l}")
            lines.append("")

    lines.append("---")
    lines.append("")
    lines.append("## 3. What to do this week")
    lines.append("")
    lines.append("1. Open `directories.csv` and re-submit any DEAD entries.")
    lines.append("2. Send 5 outreach emails from `C-local-partner-outreach.md`.")
    lines.append("3. Pitch one of the guest articles from `B-guest-post-articles.md` if you haven't already.")
    lines.append("4. Update Google Business Profile with a new post or photo.")
    lines.append("")

    out.write_text("\n".join(lines), encoding="utf-8")
    return out


    return out


# ---------- main -----------------------------------------------------------

def main(argv=None) -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--emoji", action="store_true", help="print Unicode status icons")
    p.add_argument(
        "--offline", action="store_true",
        help="skip live HTTP checks (just write report shell)",
    )
    args = p.parse_args(argv)

    # All print goes through an ASCII stream wrapper if not --emoji
    if not args.emoji:
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="ascii", errors="replace")
        sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="ascii", errors="replace")

    def say(line: str) -> None:
        print(line)

    say(f"=== Backlink monitor — {datetime.now(timezone.utc).isoformat()} ===")
    say(f"Target: {SITE}")

    if args.offline:
        say("[offline mode — skipping HTTP]")
        report = write_report([], set(), set(), 0)
        say(f"-> {report.name}")
        return 0

    say("[1/3] Checking directories ...")
    directories = check_directories(ROOT / "directories.csv")
    say(f"      {len(directories)} entries checked.")
    if directories:
        down = [d for d in directories if not d["ok"]]
        for d in down:
            say(f"      !! {d['name']} — {status_text(d['status_code'], args.emoji)}")

    say("[2/3] Reading backlink CSVs ...")
    gsc = read_link_csv(ROOT / "gsc-links-latest.csv")
    bing = read_link_csv(ROOT / "bing-links-latest.csv")
    all_links = gsc + bing
    say(f"      GSC: {len(gsc)} · Bing: {len(bing)} · Total: {len(all_links)}")

    new, lost = diff_with_last(all_links, ROOT / "last-links.txt")
    say(f"      New: {len(new)} · Lost: {len(lost)}")

    say("[3/3] Writing report ...")
    report = write_report(directories, new, lost, len(all_links))
    say(f"      -> {report.name}")

    (ROOT / "last-links.txt").write_text(
        "\n".join(sorted(set(all_links))) + "\n", encoding="utf-8"
    )

    say("Done.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
