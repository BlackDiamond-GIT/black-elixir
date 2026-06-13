"""Shared django-unfold ModelAdmin defaults for Black Elixir."""

from __future__ import annotations

from unfold.admin import ModelAdmin as UnfoldModelAdmin


class ElixirModelAdmin(UnfoldModelAdmin):
    """Unfold admin without save-and-continue / save-and-add-another."""

    show_save_and_continue = False
    show_save_and_add_another = False
