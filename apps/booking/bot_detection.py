"""Detect crawler/bot traffic for booking click analytics."""

from __future__ import annotations

import datetime
import hashlib
import re
from typing import TYPE_CHECKING
from zoneinfo import ZoneInfo

from django.utils import timezone

if TYPE_CHECKING:
    from django.http import HttpRequest

PRAGUE_TZ = ZoneInfo('Europe/Prague')

HOURLY_RATE_LIMIT = 12
DAILY_RATE_LIMIT = 30

_BOT_UA_SUBSTRINGS = (
    'meta-externalagent',
    'facebookexternalhit',
    'facebot',
    'googlebot',
    'bingbot',
    'semrushbot',
    'yandexbot',
    'duckduckbot',
    'applebot',
    'twitterbot',
    'linkedinbot',
    'slackbot',
    'telegrambot',
    'pinterestbot',
    'baiduspider',
    'petalbot',
    'ahrefsbot',
    'dotbot',
    'mj12bot',
    'rogerbot',
    'screaming frog',
    'render/1.0',
)

_BOT_UA_REGEX = re.compile(
    r'(?:bot|crawl|spider|slurp|preview|headless|archiver|scanner|fetcher)',
    re.IGNORECASE,
)


def client_ip(request: HttpRequest) -> str:
    ip = request.META.get('HTTP_X_FORWARDED_FOR', '').split(',')[0].strip()
    if not ip:
        ip = request.META.get('REMOTE_ADDR', '') or ''
    return ip


def ip_only_hash_from_ip(ip: str) -> str:
    if not ip:
        return ''
    return hashlib.sha256(ip.encode()).hexdigest()[:64]


def ip_only_hash_from_request(request: HttpRequest) -> str:
    return ip_only_hash_from_ip(client_ip(request))


def client_fingerprint(request: HttpRequest) -> str:
    ip = client_ip(request)
    ua = (request.META.get('HTTP_USER_AGENT') or '')[:200]
    payload = f'{ip}|{ua}'.encode()
    return hashlib.sha256(payload).hexdigest()


def is_bot_request(request: HttpRequest) -> bool:
    ua = (request.META.get('HTTP_USER_AGENT') or '').strip()
    if not ua:
        return True

    ua_lower = ua.lower()
    if any(token in ua_lower for token in _BOT_UA_SUBSTRINGS):
        return True

    return bool(_BOT_UA_REGEX.search(ua))


def _prague_day_bounds(at: datetime.datetime) -> tuple[datetime.datetime, datetime.datetime]:
    local = at.astimezone(PRAGUE_TZ)
    start_local = local.replace(hour=0, minute=0, second=0, microsecond=0)
    end_local = start_local + datetime.timedelta(days=1)
    return start_local, end_local


def is_bot_by_rate(ip_only_hash: str, *, at: datetime.datetime | None = None) -> bool:
    if not ip_only_hash:
        return False

    from .models import BookingClick

    now = at or timezone.now()
    hour_start = now - datetime.timedelta(hours=1)

    hourly_count = BookingClick.objects.filter(
        ip_only_hash=ip_only_hash,
        clicked_at__gte=hour_start,
        clicked_at__lte=now,
    ).count()
    if hourly_count >= HOURLY_RATE_LIMIT - 1:
        return True

    day_start, day_end = _prague_day_bounds(now)
    daily_count = BookingClick.objects.filter(
        ip_only_hash=ip_only_hash,
        clicked_at__gte=day_start,
        clicked_at__lt=day_end,
    ).count()
    return daily_count >= DAILY_RATE_LIMIT - 1


def is_bot_click(request: HttpRequest, ip_only_hash: str, *, at: datetime.datetime | None = None) -> bool:
    return is_bot_request(request) or is_bot_by_rate(ip_only_hash, at=at)
