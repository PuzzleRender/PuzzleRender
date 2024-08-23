"""puzzlerender URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from .views import home

urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),

    # path('api/auth/', include('dj_rest_auth.urls')),  # Authentication endpoints (login, logout, etc.)
    # path('api/auth/registration/', include('dj_rest_auth.registration.urls')),  # Registration endpoints
    # path('api-auth/', include('rest_framework.urls')),  # Optional: For DRF's built-in login
    # path('accounts/', include('allauth.urls')),  # Optional: For allauth's traditional views

    path('api/v1/', include('prenderapp.urls')),

    path('', include('authentication.urls')),
]
