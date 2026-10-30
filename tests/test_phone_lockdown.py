"""
Guard test: no disallowed phone numbers in templates or production code.

Owner decision 2026-10-30: only 420607365598, 420797669633, 420778622334
may appear anywhere (as standalone phone-number tokens).
"""

from __future__ import annotations

import re
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parent.parent

# Allowed digit sequences (no spaces, no +)
ALLOWED = {
    '420607365598',
    '420797669633',
    '420778622334',
}

# Files / dirs that are intentionally excluded from the scan
EXCLUDED_DIRS = {
    '__pycache__',
    '.git',
    'venv',
    '.venv',
    'node_modules',
    'staticfiles',   # collectstatic output — not source
    'media',
    'tests',         # guard-test assertions contain old numbers as "disallowed" strings
}

# Files whose content we skip (binary, compiled, or logs)
EXCLUDED_SUFFIXES = {'.pyc', '.mo', '.jpg', '.jpeg', '.png', '.gif',
                     '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot',
                     '.gz', '.zip', '.sqlite3', '.db'}

# Pattern: a Czech mobile number as a continuous digit string (9 digits after 420)
PHONE_DIGITS_RE = re.compile(r'420(\d{9})')

# Pattern for formatted variants like +420 607 365 598 or 420 607 365 598
PHONE_FORMATTED_RE = re.compile(r'\+?420[\s]?(\d{3})[\s]?(\d{3})[\s]?(\d{3})')


def _all_source_files():
    for path in ROOT.rglob('*'):
        if not path.is_file():
            continue
        # Skip excluded directories
        if any(part in EXCLUDED_DIRS for part in path.parts):
            continue
        if path.suffix in EXCLUDED_SUFFIXES:
            continue
        yield path


def _digits_from_formatted(match: re.Match) -> str:
    """Collapse a formatted match (e.g. +420 607 365 598) to digit string."""
    return '420' + match.group(1) + match.group(2) + match.group(3)


def test_no_disallowed_phone_numbers():
    """Fail if any non-allowed Czech phone number appears in source files."""
    violations: list[str] = []

    for filepath in _all_source_files():
        try:
            text = filepath.read_text(encoding='utf-8', errors='replace')
        except OSError:
            continue

        # Check continuous digit form
        for m in PHONE_DIGITS_RE.finditer(text):
            digits = '420' + m.group(1)
            if digits not in ALLOWED:
                line_no = text[:m.start()].count('\n') + 1
                violations.append(
                    f'{filepath.relative_to(ROOT)}:{line_no}: disallowed number {digits}'
                )

        # Check formatted form
        for m in PHONE_FORMATTED_RE.finditer(text):
            digits = _digits_from_formatted(m)
            if digits not in ALLOWED:
                line_no = text[:m.start()].count('\n') + 1
                violations.append(
                    f'{filepath.relative_to(ROOT)}:{line_no}: disallowed number {m.group(0).strip()}'
                )

    if violations:
        msg = '\n'.join(violations)
        pytest.fail(f'Disallowed phone numbers found:\n{msg}')


def test_main_number_in_footer_template():
    """The footer partial must use the MAIN tel: link."""
    footer = (ROOT / 'templates' / 'partials' / '_footer.html').read_text(encoding='utf-8')
    assert 'tel:+420607365598' in footer, 'Footer must link to tel:+420607365598'
    assert '+420 607 365 598' in footer, 'Footer must display +420 607 365 598'


def test_main_number_in_contacts_template():
    """The contacts page must use the MAIN tel: link."""
    contacts = (ROOT / 'templates' / 'contacts' / 'index.html').read_text(encoding='utf-8')
    assert 'tel:+420607365598' in contacts
    assert '+420 607 365 598' in contacts


def test_whatsapp_utils_uses_main():
    """build_whatsapp_url() must target the MAIN WhatsApp number."""
    from apps.booking.utils import build_whatsapp_url
    url = build_whatsapp_url()
    assert '420607365598' in url, f'Expected 420607365598 in wa.me URL, got: {url}'
    assert '420777123456' not in url
