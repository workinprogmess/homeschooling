#!/usr/bin/env python3

from __future__ import annotations

from datetime import datetime
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
wiki_dir = root / "wiki"
output_path = wiki_dir / "tags.md"

ignore_paths = {
    Path("wiki/tags.md"),
}

md_files = []
for path in root.rglob("*.md"):
    rel = path.relative_to(root)
    if any(part in {".git", ".context"} for part in rel.parts):
        continue
    if rel in ignore_paths:
        continue
    md_files.append(path)


tag_map: dict[str, list[dict[str, str]]] = {}

tag_re = re.compile(r"^tags:\s*(.+)\s*$")

title_re = re.compile(r"^#\s+(.+)$")

for path in md_files:
    rel = path.relative_to(root)
    rel_from_wiki = Path("..") / rel
    try:
        lines = path.read_text(encoding="utf-8").splitlines()
    except Exception:
        continue

    title = None
    for line in lines:
        match = title_re.match(line)
        if match:
            title = match.group(1).strip()
            break

    tags_line = None
    for line in lines[:30]:
        match = tag_re.match(line.strip())
        if match:
            tags_line = match.group(1)
            break

    if not tags_line:
        continue

    tags = [t.strip() for t in tags_line.split(",") if t.strip()]
    for tag in tags:
        tag_map.setdefault(tag, []).append(
            {
                "title": title or rel.name,
                "path": rel_from_wiki.as_posix(),
            }
        )

for tag in tag_map:
    tag_map[tag] = sorted(tag_map[tag], key=lambda x: x["title"])

now = datetime.now().strftime("%Y-%m-%d / %I:%M %p").lower()

lines_out = [
    "# tags",
    "tags: wiki, index",
    "related:",
    "- [wiki index](./index.md)",
    "",
    f"generated: {now}",
    "",
]

for tag in sorted(tag_map.keys()):
    lines_out.append(f"## {tag}")
    for item in tag_map[tag]:
        lines_out.append(f"- [{item['title']}]({item['path']})")
    lines_out.append("")

output_path.write_text("\n".join(lines_out).rstrip() + "\n", encoding="utf-8")
