HEADING_MAX_LEN = 120
HEADING_MAX_WORDS = 10


def _is_heading(block):
    if block.startswith('## '):
        return True
    if len(block) > HEADING_MAX_LEN:
        return False
    if block.endswith('?'):
        return True
    if block.endswith('.'):
        return False
    return len(block.split()) <= HEADING_MAX_WORDS


def _strip_heading_marker(block):
    if block.startswith('## '):
        return block[3:].strip()
    return block


def parse_description_sections(text):
    blocks = [block.strip() for block in text.split('\n\n') if block.strip()]
    if not blocks:
        return []

    sections = []
    index = 0

    if not _is_heading(blocks[0]):
        sections.append({'type': 'intro', 'content': blocks[0]})
        index = 1

    while index < len(blocks):
        block = blocks[index]

        if _is_heading(block):
            heading = _strip_heading_marker(block)
            index += 1
            paragraphs = []
            while index < len(blocks) and not _is_heading(blocks[index]):
                paragraphs.append(blocks[index])
                index += 1
            sections.append({
                'type': 'section',
                'heading': heading,
                'paragraphs': paragraphs,
            })
            continue

        sections.append({'type': 'paragraph', 'content': block})
        index += 1

    return sections
