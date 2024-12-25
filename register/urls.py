from django.contrib import admin
from django.urls import path 
from register import views

urlpatterns = [
    path('', views.register, name='register'),  # This handles the /register URL
    path('sign/', views.sign, name='sign'),  # This handles /register/sign URL
]
