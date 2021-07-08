from django.urls import path, include
from . import views
from .api.bros import urls as apiUrl

urlpatterns = [
    path('', views.index,name='register'),
    path('home', views.home,name='home'),
    path('signout', views.signout_page,name='signout'),
    path('signin', views.signin_page,name='signin'),
]