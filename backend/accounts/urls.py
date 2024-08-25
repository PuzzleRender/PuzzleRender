from django.urls import path
from .views import signin_view, signup_view, signout_view, check_auth, csrf_token_view, protected_view, validate_token, change_password_view, update_user_view

urlpatterns = [
    path('signup/', signup_view, name='signup'),
    path('signin/', signin_view, name='signin'),
    path('signout/', signout_view, name='signout'),
    
    path('api/check-auth/', check_auth, name='check_auth'),
    path('api/csrf-token/', csrf_token_view, name='csrf_token'),
    path('pro/', protected_view, name='protected_view'),
    # path('api/check-auth/', check_auth_unauthenticated, name='check_auth_unauthenticated'),

    path('api/validate-token', validate_token, name='validate_token'),
    path('api/update-user/', update_user_view, name='update_user_view'),
    path('api/change-password/', change_password_view, name='change_password_view'),
]
