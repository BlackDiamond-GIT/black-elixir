from django.urls import path
from . import views

app_name = 'pages'

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('massages/', views.MassagesView.as_view(), name='massages'),
    path('prices/', views.PricesView.as_view(), name='prices'),
    path('contacts/', views.ContactsView.as_view(), name='contacts'),
    path('faq/', views.FaqView.as_view(), name='faq'),
    path('about/', views.AboutView.as_view(), name='about'),
    path('salon-rules/', views.SalonRulesView.as_view(), name='salon_rules'),
    path('privacy/', views.PrivacyView.as_view(), name='privacy'),
]
