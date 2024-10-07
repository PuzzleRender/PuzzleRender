from django.urls import path
from .views import signin_view, signup_view, signout_view, check_auth, csrf_token_view, protected_view, validate_token, change_password_view, update_user_view
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [
    path('signup/', signup_view, name='signup'),
    path('signin/', signin_view, name='signin'),
    path('signout/', signout_view, name='signout'),
    
    path('check-auth/', check_auth, name='check_auth'),
    path('csrf-token/', csrf_token_view, name='csrf_token'),
    path('pro/', protected_view, name='protected_view'),
    # path('api/check-auth/', check_auth_unauthenticated, name='check_auth_unauthenticated'),

    path('validate-token', validate_token, name='validate_token'),
    path('update-user/', update_user_view, name='update_user_view'),
    path('change-password/', change_password_view, name='change_password_view'),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
