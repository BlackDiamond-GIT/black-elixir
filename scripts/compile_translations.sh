#!/usr/bin/env bash
set -o errexit

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

python3 scripts/compile_translations.py
