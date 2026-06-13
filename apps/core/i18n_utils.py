def localized_field(obj, field_base, lang, fallback_lang='cs'):
    value = getattr(obj, f'{field_base}_{lang}', None)
    if value:
        return value
    return getattr(obj, f'{field_base}_{fallback_lang}', '')


def localize_post(post, lang):
    post.title = localized_field(post, 'title', lang)
    post.excerpt = localized_field(post, 'excerpt', lang)
    post.content = localized_field(post, 'content', lang)
    return post
