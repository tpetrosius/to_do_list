from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='to-do-home'),
    path('about/', views.about, name='to-do-about'),
]
