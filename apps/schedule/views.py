from django.shortcuts import redirect


def schedule_index(request):
    return redirect('pages:home', permanent=True)
