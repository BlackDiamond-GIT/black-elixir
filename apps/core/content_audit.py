import re
from pathlib import Path

from django.conf import settings

FORBIDDEN_PATTERNS = [
    r'erot\w*',
    r'sensual\w*',
    r'sexual\w*',
    r'arous\w*',
    r'intimate\s+massage',
    r'tantra\w*',
    r'nuru\w*',
    r'bdsm',
    r'fetish\w*',
    r'lingam\w*',
    r'yoni\w*',
    r'happy\s+ending',
    r'body[\s-]to[\s-]body',
    r'чуттєв\w*',
    r'эрот\w*',
    r'сексуал\w*',
    r'збудж\w*',
    r'vzrušuj\w*',
    r'sexuáln\w*',
    r'erotick\w*',
    r'erotická\s+masáž',
    r'erotický\s+masáž',
]

FORBIDDEN_RE = re.compile('|'.join(FORBIDDEN_PATTERNS), re.IGNORECASE | re.UNICODE)

SCAN_DIRS = ('apps', 'templates', 'locale', 'static')
SCAN_EXTENSIONS = {'.py', '.html', '.po', '.json', '.js', '.css', '.jsx', '.md'}
SKIP_DIR_NAMES = {'venv', 'staticfiles', '__pycache__', '.git', 'node_modules'}
SKIP_REL_PATHS = {
    'apps/core/content_audit.py',
    'apps/core/management/commands/audit_site_content.py',
}


def find_matches_in_text(text, source_label):
    matches = []
    for match in FORBIDDEN_RE.finditer(text):
        start = max(0, match.start() - 30)
        end = min(len(text), match.end() + 30)
        snippet = text[start:end].replace('\n', ' ')
        matches.append({
            'source': source_label,
            'term': match.group(),
            'snippet': snippet,
        })
    return matches


def iter_scan_files(root):
    root_path = Path(root)
    for scan_dir in SCAN_DIRS:
        base = root_path / scan_dir
        if not base.is_dir():
            continue
        for path in base.rglob('*'):
            if any(part in SKIP_DIR_NAMES for part in path.parts):
                continue
            if path.suffix not in SCAN_EXTENSIONS:
                continue
            if path.is_file():
                rel = path.relative_to(root_path).as_posix()
                if rel in SKIP_REL_PATHS:
                    continue
                yield path


def scan_files(root=None):
    root = root or settings.BASE_DIR
    findings = []
    for path in iter_scan_files(root):
        try:
            text = path.read_text(encoding='utf-8')
        except (OSError, UnicodeDecodeError):
            continue
        rel = path.relative_to(root)
        findings.extend(find_matches_in_text(text, str(rel)))
    return findings


def scan_model_instances(model, text_fields, label_prefix):
    findings = []
    for obj in model.objects.all():
        for field in text_fields:
            value = getattr(obj, field, None)
            if not value:
                continue
            label = f'{label_prefix}:{obj.pk}:{field}'
            findings.extend(find_matches_in_text(str(value), label))
    return findings


def scan_database():
    from apps.blog.models import Post
    from apps.masseurs.models import Masseuse
    from apps.services.models import MassageType

    findings = []
    findings.extend(
        scan_model_instances(
            MassageType,
            [
                'name_cs', 'name_en', 'name_ru',
                'description_cs', 'description_en', 'description_ru',
                'meta_title', 'meta_description',
            ],
            'MassageType',
        )
    )
    findings.extend(
        scan_model_instances(
            Masseuse,
            [
                'name', 'bio_cs', 'bio_en', 'bio_ru',
                'spec_cs', 'spec_en', 'spec_ru',
                'photo_alt', 'meta_title', 'meta_description',
            ],
            'Masseuse',
        )
    )
    findings.extend(
        scan_model_instances(
            Post,
            [
                'title_cs', 'title_en', 'title_ru',
                'excerpt_cs', 'excerpt_en', 'excerpt_ru',
                'content_cs', 'content_en', 'content_ru',
                'image_alt',
            ],
            'Post',
        )
    )
    return findings
