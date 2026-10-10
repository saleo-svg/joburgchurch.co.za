"""Reset the 2 test-published .md back to draft + reset queue."""
import re
from pathlib import Path

posts_dir = Path(r"src\content\posts")

count = 0
for p in posts_dir.glob("*.md"):
    if not p.name.startswith("_"):
        t = p.read_text(encoding="utf-8")
        if "status: published" in t:
            t = t.replace("status: published", "status: draft", 1)
            p.write_text(t, encoding="utf-8")
            count += 1
print(f"Reverted {count} files back to draft")

queue_path = posts_dir / "_release-queue.json"
q = queue_path.read_text(encoding="utf-8")
q = re.sub(r'"status":\s*"released"', '"status": "pending"', q)
queue_path.write_text(q, encoding="utf-8")
print("Queue reset")
