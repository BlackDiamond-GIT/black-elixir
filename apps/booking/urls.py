from django.urls import path
from . import views

app_name = 'booking'

urlpatterns = [
    path('', views.ReservationView.as_view(), name='index'),
    path('step/<str:step>/', views.ReservationStepView.as_view(), name='step'),
]
