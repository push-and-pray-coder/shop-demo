from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register, name="register"),
    path("csrf/", views.csrf_token, name="csrf_token"),
    path("login/", views.login_user, name="login"),
    path("logout/", views.logout_user, name="logout"),
    path("me/", views.current_user, name="current_user"),
]