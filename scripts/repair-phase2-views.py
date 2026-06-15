#!/usr/bin/env python3
"""Repair broken view div tags from Phase 2 build."""
import re
from pathlib import Path

path = Path(__file__).resolve().parents[1] / "sites" / "03. sunterra-solar-v2-website.html"
content = path.read_text(encoding="utf-8")

# Fix comments that swallowed opening div.view tags
content = re.sub(
    r'<!-- ========== VIEW:  data-route="([^"]+)"([^>]*?)>\s*\n',
    r'<!-- ========== VIEW: \1 ========== -->\n    <div class="view" data-route="\1"\2>\n',
    content
)

# Ensure residential comment format is consistent
content = content.replace(
    '<!-- ========== VIEW: residential ========== -->',
    '<!-- ========== VIEW: residential ========== -->'
)

path.write_text(content, encoding="utf-8")
views = len(re.findall(r'<div class="view" data-route=', content))
print(f"Repaired {path.name}: {views} view wrappers, {content.count(chr(10))+1} lines")
