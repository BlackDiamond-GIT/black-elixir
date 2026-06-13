from django.urls import path
from . import views

app_name = 'masseurs'

urlpatterns = [
    path('', views.MasseuseListView.as_view(), name='list'),
    path('<slug:slug>/', views.MasseuseDetailView.as_view(), name='detail'),
]
