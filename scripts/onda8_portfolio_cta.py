#!/usr/bin/env python3
"""Onda 8 — Insere <PortfolioCTA> + import em todas as portfolio pages."""
import os
import re
import glob

ROOT = "src/app"
IMPORT_LINE = "import PortfolioCTA from '@/app/components/PortfolioCTA';"
MARKER = "{/* Navigation Links before footer */}"

targets = []
for unit in ("studio", "produtora", "agencia"):
    base = f"{ROOT}/portfolio-{unit}"
    for path in sorted(glob.glob(f"{base}/*/page.js")):
        slug = os.path.basename(os.path.dirname(path))
        # for [slug] template pass null
        project_slug = None if slug == "[slug]" else slug
        targets.append((path, unit, project_slug))

print(f"Found {len(targets)} portfolio pages")

skipped, updated = [], []
for path, unit, slug in targets:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    if "PortfolioCTA" in content:
        skipped.append(path + " (already has PortfolioCTA)")
        continue

    # 1) Insert import after the LAST existing import line
    lines = content.split("\n")
    last_import_idx = -1
    for i, line in enumerate(lines):
        if line.startswith("import ") or line.startswith("import{"):
            last_import_idx = i
    if last_import_idx < 0:
        skipped.append(path + " (no imports found)")
        continue
    lines.insert(last_import_idx + 1, IMPORT_LINE)
    content = "\n".join(lines)

    # 2) Insert CTA before marker (preserving indentation)
    if slug:
        cta = f'<PortfolioCTA businessUnit="{unit}" projectSlug="{slug}" />'
    else:
        cta = f'<PortfolioCTA businessUnit="{unit}" />'

    # Find marker with its leading whitespace; fall back to <footer
    pattern = re.compile(r"^([ \t]*)" + re.escape(MARKER), re.MULTILINE)
    m = pattern.search(content)
    if m:
        indent = m.group(1)
        replacement = f"{indent}{cta}\n\n{indent}{MARKER}"
        content = pattern.sub(replacement, content, count=1)
    else:
        # fallback: insert before first <footer tag
        fb = re.compile(r"^([ \t]*)<footer", re.MULTILINE)
        m = fb.search(content)
        if not m:
            skipped.append(path + " (no marker and no <footer)")
            continue
        indent = m.group(1)
        replacement = f"{indent}{cta}\n\n{indent}<footer"
        content = fb.sub(replacement, content, count=1)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    updated.append(path)

print(f"\nUpdated: {len(updated)}")
print(f"Skipped: {len(skipped)}")
for s in skipped:
    print("  -", s)
