#!/usr/bin/env python3

from __future__ import annotations

from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]

ignore_paths = {
    root / "wiki" / "index.md",
    root / "wiki" / "tags.md",
}

heading_re = re.compile(r"^(#{2,6})\s+(.+?)\s*$")

def slugify(text: str) -> str:
    text = text.strip().lower()
    out = []
    prev_dash = False
    for ch in text:
        if ch.isalnum():
            out.append(ch)
            prev_dash = False
        elif ch in {" ", "-"}:
            if not prev_dash:
                out.append("-")
                prev_dash = True
        else:
            # drop punctuation and symbols
            continue
    slug = "".join(out).strip("-")
    slug = re.sub(r"-+", "-", slug)
    return slug


def build_toc(lines: list[str]) -> list[str]:
    toc: list[str] = []
    for line in lines:
        match = heading_re.match(line)
        if not match:
            continue
        level = len(match.group(1))
        title = match.group(2)
        if level != 2:
            continue
        if title.lower() == "table of contents":
            continue
        if title.lower() == "sources / references":
            continue
        slug = slugify(title)
        toc.append(f"- [{title}](#{slug})")
    return toc


def update_file(path: Path) -> bool:
    if path in ignore_paths:
        return False
    rel = path.relative_to(root)
    if any(part in {".git", ".context"} for part in rel.parts):
        return False

    try:
        lines = path.read_text(encoding="utf-8").splitlines()
    except Exception:
        return False

    if "## table of contents" not in lines:
        return False

    toc = build_toc(lines)

    start_marker = "<!-- toc:start -->"
    end_marker = "<!-- toc:end -->"

    out: list[str] = []
    i = 0
    changed = False
    while i < len(lines):
        line = lines[i]
        out.append(line)
        if line == "## table of contents":
            i += 1
            # skip existing blank lines
            while i < len(lines) and lines[i].strip() == "":
                i += 1
            if i < len(lines) and lines[i] == start_marker:
                # replace between markers
                out.append(start_marker)
                out.extend(toc)
                out.append(end_marker)
                changed = True
                # advance to end marker
                while i < len(lines) and lines[i] != end_marker:
                    i += 1
                if i < len(lines) and lines[i] == end_marker:
                    i += 1
                continue

            # no markers: insert them and skip old toc lines until divider or heading
            out.append(start_marker)
            out.extend(toc)
            out.append(end_marker)
            changed = True
            while i < len(lines):
                next_line = lines[i]
                if next_line.startswith("#") or next_line.strip() == "---":
                    break
                i += 1
            continue
        i += 1

    if changed:
        path.write_text("\n".join(out).rstrip() + "\n", encoding="utf-8")
    return changed


changed_any = False
for path in root.rglob("*.md"):
    if update_file(path):
        changed_any = True

if changed_any:
    print("toc updated")
else:
    print("no toc updates")
