#!/usr/bin/env bash
set -o errexit

python -m pip install --upgrade pip
pip install -r requirements.txt

rm -rf staticfiles
python3 scripts/compile_translations.py || echo "Warning: translation compile skipped"
python manage.py collectstatic --no-input
python manage.py migrate --no-input
python manage.py bootstrap_site
