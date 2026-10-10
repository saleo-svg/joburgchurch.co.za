"""
生成 用户对话汇总.txt 和 开发记录.txt
- 用户对话汇总.txt: 用户的提问/问题/对话（不含 AI 答案）
- 开发记录.txt: AI 的答案和开发记录（不含用户原始对话）

约束:
- 用户对话汇总.txt 使用 UTF-8
- 开发记录.txt 使用 GBK (保持历史一致性)
"""
import re
import os
from pathlib import Path

base = Path(r"C:\Users\Laptop\Desktop\Church-Site")
src_md = base / "开发记录.md"
out_user_txt = base / "用户对话汇总.txt"
out_dev_txt = base / "开发记录.txt"


def split_sections(content: str):
    """
    按 ## 章节切分。每个章节进一步分离:
    - 用户原始请求块: 标题含 "用户对话" / "TXT 导出请求" / "导出请求"
                      / 内容只包含 "用户提问/原始请求/期望" 等用户视角
    - AI 答案块: 标题含 "Reddit 教会话题研究请求" / 其他

    返回:
      user_sections: list of (heading, user_text)
      ai_sections:   list of (heading, ai_text)
    """
    parts = re.split(r"(?m)^## ", content)
    head_intro = parts[0]
    top_sections = []
    for p in parts[1:]:
        first_nl = p.find("\n")
        heading = p[:first_nl].strip()
        body = p[first_nl:].rstrip() + "\n"
        top_sections.append((heading, body))

    user_topics = []
    ai_topics = []
    for heading, body in top_sections:
        # 标题含"对话汇总 TXT" / "导出请求" -> 用户视角章节
        if any(kw in heading for kw in ["TXT 导出请求", "对话汇总"]):
            user_topics.append((heading, body))
        else:
            # 其他都是 AI 章节（包含 Reddit 研究报告等）
            ai_topics.append((heading, body))

    return head_intro, user_topics, ai_topics


def build_user_md():
    """用户对话汇总 - 从 用户对话汇总.md 抽取用户对话"""
    # 直接基于 用户对话汇总.md (现在已经包含 2026-10-02 内容)
    user_md = base / "用户对话汇总.md"
    old_text = user_md.read_text(encoding="utf-8")

    lines = []
    # 顶部说明（覆盖原始的 # 用户对话汇总 标题）
    lines.append("# 用户对话汇总")
    lines.append("# Johannesburg Bible Study Church Website Project")
    lines.append("# 最近更新: 2026-10-02")
    lines.append("#")
    lines.append("# 说明: 本文件仅包含用户的提问 / 问题 / 对话。")
    lines.append("#       AI 的答案和实施细节请见 开发记录.txt / 开发记录.md。")
    lines.append("")
    lines.append("---")
    lines.append("")

    # 切掉原始的标题部分，从第一个 ## 标题开始
    parts = old_text.split("## ", 1)
    if len(parts) == 2:
        # 丢掉原始的 # 用户对话汇总 头部
        rest = "## " + parts[1]
        lines.append(rest.rstrip())
    else:
        lines.append(old_text)

    return "\n".join(lines)


def build_dev_txt():
    """开发记录 - 从 开发记录.md 中抽取 AI 答案和开发记录
    过滤用户对话部分（如 "### 用户原始请求", "### 用户请求时间线" 等）"""
    text = src_md.read_text(encoding="utf-8")
    head_intro, user_topics, ai_topics = split_sections(text)

    # 用户视角的小节标题（必须从 AI 答案中过滤掉）
    user_subsections = {
        "用户原始请求",
        "用户请求时间线",
        "用户核心需求",
        "用户当前核心需求",
        "用户隐含策略",
        "用户期望的产出",
        "用户隐含的格式要求",
        "任务背景",  # 包含"用户希望..."
    }

    lines = []
    # 顶部说明
    lines.append("# 开发记录汇总")
    lines.append("# Johannesburg Bible Study Church Website Project")
    lines.append("# 项目目录: C:\\Users\\Laptop\\Desktop\\Church-Site")
    lines.append("# 最近更新: 2026-10-02")
    lines.append("#")
    lines.append("# 说明: 本文件仅包含 AI 的答案、决策、实施细节。")
    lines.append("#       用户的提问/问题/对话请见 用户对话汇总.txt / 用户对话汇总.md。")
    lines.append("")
    lines.append("---")
    lines.append("")

    # 写头部
    lines.append(head_intro.rstrip())
    lines.append("")

    # 写每个 ## 章节，但要过滤掉用户视角的子节
    for heading, body in ai_topics:
        lines.append("## " + heading)
        lines.append("")

        # 按 ### 切分子节，过滤用户视角子节
        subsections = re.split(r"(?m)^### ", body)
        # 第一个元素是 ### 之前的内容（如果有）
        intro_text = subsections[0]
        if intro_text.strip():
            lines.append(intro_text.rstrip())
            lines.append("")

        for sub in subsections[1:]:
            first_nl = sub.find("\n")
            sub_heading = sub[:first_nl].strip()
            sub_body = sub[first_nl:].rstrip()

            if sub_heading in user_subsections:
                # 跳过用户视角的子节
                continue
            elif "用户希望" in sub_body[:100]:
                # 含"用户希望..."的段落也跳过
                continue
            else:
                lines.append("### " + sub_heading)
                lines.append("")
                lines.append(sub_body)
                lines.append("")

        lines.append("---")
        lines.append("")

    return "\n".join(lines)


# 生成 用户对话汇总.txt (UTF-8)
user_content = build_user_md()
out_user_txt.write_text(user_content, encoding="utf-8")
print(f"[OK] 用户对话汇总.txt: {len(user_content):,} chars (UTF-8)")

# 生成 开发记录.txt (GBK)
# GBK 不能编码某些字符（emoji ✅、部分符号），需要先过滤
dev_content = build_dev_txt()

def to_gbk_safe(text: str) -> str:
    """将 GBK 不能编码的字符替换成 ASCII 近似字符"""
    result = []
    for ch in text:
        try:
            ch.encode("gbk")
            result.append(ch)
        except UnicodeEncodeError:
            # 替换常见不可编码字符
            if ch in "✅❌☑✓✔✗✘":
                result.append("[OK]" if ch == "✅" else "[X]")
            elif ch == "→":
                result.append("->")
            elif ch == "←":
                result.append("<-")
            elif ch == "✓":
                result.append("[v]")
            else:
                # 通用替换：尝试 cp1252 替代，找不到就丢
                try:
                    result.append(ch.encode("cp1252").decode("cp1252"))
                except (UnicodeEncodeError, UnicodeDecodeError):
                    result.append("?")
    return "".join(result)


dev_content_safe = to_gbk_safe(dev_content)
out_dev_txt.write_text(dev_content_safe, encoding="gbk")
print(f"[OK] 开发记录.txt: {len(dev_content_safe):,} chars (GBK, safe-encoded)")