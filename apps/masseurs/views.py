from django.shortcuts import redirect


def masseuse_list(request):
    return redirect('pages:home', permanent=True)


def masseuse_detail(request, slug):
    return redirect('pages:home', permanent=True)
