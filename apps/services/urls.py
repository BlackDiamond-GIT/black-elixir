from django.urls import path

from . import views

app_name = 'services'

urlpatterns = [
    path('<slug:slug>/', views.ServiceDetailView.as_view(), name='detail'),
]
