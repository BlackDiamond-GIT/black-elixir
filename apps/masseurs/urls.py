from django.urls import path
from . import views

app_name = 'masseurs'

urlpatterns = [
    path('', views.masseuse_list, name='list'),
    path('<slug:slug>/', views.masseuse_detail, name='detail'),
]
