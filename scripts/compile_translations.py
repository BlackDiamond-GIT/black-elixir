#!/usr/bin/env python3
"""Compile django.po to django.mo using msgfmt or polib."""

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LOCALES = ('cs', 'en', 'ru')


def compile_with_msgfmt():
    import shutil
    msgfmt = shutil.which('msgfmt')
    if not msgfmt:
        for candidate in (
            '/opt/homebrew/opt/gettext/bin/msgfmt',
            '/usr/local/opt/gettext/bin/msgfmt',
        ):
            if Path(candidate).exists():
                msgfmt = candidate
                break
    if not msgfmt:
        return False

    for lang in LOCALES:
        po = ROOT / 'locale' / lang / 'LC_MESSAGES' / 'django.po'
        mo = po.with_suffix('.mo')
        subprocess.run([msgfmt, '-o', str(mo), str(po)], check=True)
    return True


def compile_with_polib():
    try:
        import polib
    except ImportError:
        return False

    for lang in LOCALES:
        po_path = ROOT / 'locale' / lang / 'LC_MESSAGES' / 'django.po'
        po = polib.pofile(str(po_path))
        po.save_as_mofile(str(po_path.with_suffix('.mo')))
    return True


def main():
    if compile_with_msgfmt():
        print('Compiled translations with msgfmt')
        return

    try:
        subprocess.run(
            [sys.executable, '-m', 'pip', 'install', 'polib', '-q'],
            check=True,
        )
    except subprocess.CalledProcessError:
        print('Failed to install polib')
        sys.exit(1)

    if compile_with_polib():
        print('Compiled translations with polib')
        return

    print('Could not compile translations')
    sys.exit(1)


if __name__ == '__main__':
    main()
