_FAQ_CACHE = None


def build_service_description(intro, sections):
    parts = []
    if intro and intro.strip():
        parts.append(intro.strip())
    for heading, paragraphs in sections:
        parts.append(f'\n\n{heading}\n\n')
        parts.append('\n\n'.join(paragraphs))
    return ''.join(parts).strip()


def get_service_faqs(slug, lang='cs'):
    global _FAQ_CACHE
    if _FAQ_CACHE is None:
        from apps.services.seed_catalog import SERVICE_CATALOG
        from apps.services.seed_content import generate_service_faqs

        _FAQ_CACHE = {}
        for item in SERVICE_CATALOG:
            _FAQ_CACHE.update(generate_service_faqs(item))

    service_faqs = _FAQ_CACHE.get(slug, {})
    if lang in service_faqs:
        return service_faqs[lang]
    return service_faqs.get('cs', [])
