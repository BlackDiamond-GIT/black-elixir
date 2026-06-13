def media_field_url(field, fallback=''):
    if field and getattr(field, 'name', ''):
        return field.url
    return fallback
