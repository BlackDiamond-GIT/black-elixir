from django import forms
from tinymce.widgets import TinyMCE


def rich_text_widgets(*field_names: str) -> dict[str, forms.Widget]:
    """Return TinyMCE widgets for named TextField fields."""
    return {name: TinyMCE(attrs={'cols': 80, 'rows': 30}) for name in field_names}
