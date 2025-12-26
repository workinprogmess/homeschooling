#!/usr/bin/env python3

from __future__ import annotations

from datetime import datetime
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
wiki_dir = root / "wiki"
index_path = wiki_dir / "index.md"
tags_path = wiki_dir / "tags.md"

ignore_paths = {index_path, tags_path}

md_files: list[Path] = []
for path in root.rglob("*.md"):
    rel = path.relative_to(root)
    if any(part in {".git", ".context"} for part in rel.parts):
        continue
    if path in ignore_paths:
        continue
    md_files.append(path)


tag_line_re = re.compile(r"^\s*(?:\*\*tags:\*\*|tags:)\s*(.+)\s*$", re.IGNORECASE)

tag_re = re.compile(r"#([a-z0-9-]+)")

title_re = re.compile(r"^#\s+(.+)$")


docs: list[dict[str, object]] = []
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

    tags: list[str] = []
    for line in lines[:40]:
        match = tag_line_re.match(line.strip())
        if match:
            tags = [f"#{t}" for t in tag_re.findall(match.group(1))]
            break

    docs.append(
        {
            "title": title or rel.name,
            "rel": rel,
            "rel_from_wiki": rel_from_wiki.as_posix(),
            "tags": tags,
        }
    )

# add wiki docs explicitly
wiki_docs = [
    {
        "title": "wiki index",
        "rel": Path("wiki/index.md"),
        "rel_from_wiki": "./index.md",
        "tags": ["#wiki-index", "#documentation-map"],
    },
    {
        "title": "tags",
        "rel": Path("wiki/tags.md"),
        "rel_from_wiki": "./tags.md",
        "tags": ["#wiki-tags", "#documentation-map"],
    },
]

# avoid duplicates if they already exist
existing = {str(doc["rel"]) for doc in docs}
for doc in wiki_docs:
    if str(doc["rel"]) not in existing:
        docs.append(doc)

# build tag map

tag_map: dict[str, list[dict[str, str]]] = {}
for doc in docs:
    for tag in doc["tags"]:
        tag_map.setdefault(tag, []).append(
            {
                "title": str(doc["title"]),
                "path": str(doc["rel_from_wiki"]),
            }
        )

for tag in tag_map:
    tag_map[tag] = sorted(tag_map[tag], key=lambda x: x["title"])

# build folder map
folder_map: dict[str, list[dict[str, str]]] = {}
for doc in docs:
    rel = doc["rel"]
    if isinstance(rel, Path):
        parts = rel.parts
    else:
        parts = Path(rel).parts

    folder = "root" if len(parts) == 1 else parts[0]
    folder_map.setdefault(folder, []).append(
        {
            "title": str(doc["title"]),
            "path": str(doc["rel_from_wiki"]),
        }
    )

for folder in folder_map:
    folder_map[folder] = sorted(folder_map[folder], key=lambda x: x["title"])

now = datetime.now().strftime("%Y-%m-%d / %I:%M %p").lower()

# write wiki/index.md
index_lines = [
    "# wiki index",
    "",
    "map of content across the repo.",
    "",
    "**tags:** #wiki-index #documentation-map",
    "**related:** [tags](./tags.md), [journal](../journal.md)",
    "",
    "## table of contents",
    "- [by folder](#by-folder)",
    "- [by tag](#by-tag)",
    "- [sources / references](#sources--references)",
    "",
    "---",
    "",
    "## by folder",
]

for folder in sorted(folder_map.keys()):
    index_lines.append(f"### {folder}")
    for item in folder_map[folder]:
        index_lines.append(f"- [{item['title']}]({item['path']})")
    index_lines.append("")

index_lines.append("## by tag")
for tag in sorted(tag_map.keys()):
    anchor = tag[1:]
    index_lines.append(f"- [{tag}](./tags.md#{anchor})")
index_lines.append("")

index_lines.append("## sources / references")
index_lines.append("- none yet")
index_lines.append("")

index_path.write_text("\n".join(index_lines).rstrip() + "\n", encoding="utf-8")

# write wiki/tags.md

tags_lines = [
    "# tags",
    "",
    "tag index across the repo.",
    "",
    "**tags:** #wiki-tags #documentation-map",
    "**related:** [wiki index](./index.md)",
    "",
    "## table of contents",
    "- [tags](#tags)",
    "- [sources / references](#sources--references)",
    "",
    f"generated: {now}",
    "",
    "---",
    "",
    "## tags",
]

for tag in sorted(tag_map.keys()):
    tags_lines.append(f"### {tag}")
    for item in tag_map[tag]:
        tags_lines.append(f"- [{item['title']}]({item['path']})")
    tags_lines.append("")

tags_lines.append("## sources / references")
tags_lines.append("- none yet")

tags_path.write_text("\n".join(tags_lines).rstrip() + "\n", encoding="utf-8")
