"""Fixed display rates aligned with tantra-prague.com/cenik/ (CZK → EUR / USD)."""

CURRENCIES = ('CZK', 'EUR', 'USD')

CURRENCY_META = {
    'CZK': {'symbol': 'Kč', 'prefix': False},
    'EUR': {'symbol': '€', 'prefix': True},
    'USD': {'symbol': '$', 'prefix': True},
}

# Approx. 1 EUR ≈ 22 CZK, 1 USD ≈ 20 CZK (same ratio as reference site).
EUR_RATE = 1 / 22
USD_RATE = 1 / 20


def normalize_currency(code):
    code = (code or 'CZK').upper()
    return code if code in CURRENCIES else 'CZK'


def convert_czk(amount_czk, currency):
    amount = int(amount_czk)
    currency = normalize_currency(currency)
    if currency == 'CZK':
        return amount
    if currency == 'EUR':
        return round(amount * EUR_RATE)
    return round(amount * USD_RATE)


def format_amount(amount, currency):
    currency = normalize_currency(currency)
    meta = CURRENCY_META[currency]
    formatted = f'{int(amount):,}'.replace(',', ' ')
    if meta['prefix']:
        return f'{meta["symbol"]}{formatted}'
    return f'{formatted} {meta["symbol"]}'


def format_price_czk(amount_czk, currency='CZK'):
    return format_amount(convert_czk(amount_czk, currency), currency)


def format_price_triple(amount_czk):
    return {
        'czk': format_price_czk(amount_czk, 'CZK'),
        'eur': format_price_czk(amount_czk, 'EUR'),
        'usd': format_price_czk(amount_czk, 'USD'),
    }
