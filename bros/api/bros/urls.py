from django.urls import path
from . import views


urlpatterns = [
    path('profile_data',views.response,name='get_response'),
    path('post_brocode',views.post_brocode,name='post_response'),
    path('get_brocodes/<str:timestamp>/',views.get_brocodes,name='brocode_response'),
    path('like_brocodes/<int:brocode_id>',views.like_brocode,name='like_response'),
    path('unlike_brocodes/<int:brocode_id>',views.unlike_brocode,name='unlike_response'),
    path('searchusers',views.search_users,name='search_users'),
    path('profile/<str:slug>',views.get_profile,name='user_profile'),
    path('commit_follow/<str:slug>',views.commit_follow,name='user_profile'),
]