from django.urls import path
from .views import signin_view, signup_view, signout_view, check_auth, csrf_token_view, protected_view, list_users_json, user_data_view

urlpatterns = [
    path('signup/', signup_view, name='signup'),
    path('signin/', signin_view, name='signin'),
    path('signout/', signout_view, name='signout'),
    
    path('api/check-auth/', check_auth, name='check_auth'),
    path('api/csrf-token/', csrf_token_view, name='csrf_token'),
    path('pro/', protected_view, name='protected_view'),
    # path('api/check-auth/', check_auth_unauthenticated, name='check_auth_unauthenticated'),

    path('users/json/', list_users_json, name='list_users_json'),
    path('api/user-data/', user_data_view, name='user_data'),
]
