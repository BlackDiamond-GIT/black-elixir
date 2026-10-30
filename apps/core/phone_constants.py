"""
Phone number constants — single source of truth.

Owner decision 2026-10-30: only these three numbers may appear anywhere.
Numbers are hard-coded here; they must NOT come from DB/admin/env/hub API.

Usage:
    from apps.core.phone_constants import PHONE_MAIN, PHONE_MAIN_TEL, PHONE_MAIN_WA
"""

# Main studio number — used in header, footer, hero, contact page,
# sticky/floating call + WhatsApp buttons, every booking/"Rezervovat" button,
# JSON-LD telephone, phone mentions in texts, all defaults/fallbacks.
PHONE_MAIN = '+420 607 365 598'        # display format
PHONE_MAIN_TEL = 'tel:+420607365598'   # href for <a href="tel:…">
PHONE_MAIN_WA = '420607365598'         # wa.me/ path (no + or spaces)
PHONE_MAIN_WA_URL = f'https://wa.me/{PHONE_MAIN_WA}'

# Studio/branch phones — only where the site shows a per-studio phone.
# Never used as WhatsApp targets.
PHONE_STUDIO_A = '+420 797 669 633'
PHONE_STUDIO_B = '+420 778 622 334'

# All three allowed numbers (for guard test)
ALLOWED_PHONES_DIGITS = {
    '420607365598',
    '420797669633',
    '420778622334',
}
