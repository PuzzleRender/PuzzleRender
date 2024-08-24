from django.middleware.csrf import get_token
from django.http import JsonResponse

def csrf_token_view(request):
    return JsonResponse({'csrfToken': get_token(request)})

from django.http import JsonResponse
from django.contrib.auth.models import User
from django.core.serializers import serialize

def list_users_json(request):
    users = User.objects.all()
    users_data = serialize('json', users)
    return JsonResponse(users_data, safe=False)



from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

@api_view(['GET'])
def check_auth(request):
    return Response({'isAuthenticated': request.user.is_authenticated})



from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({'message': 'Protected view'})



from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from .forms import CustomUserCreationForm

@api_view(['POST'])
def signup_view(request):
    data = request.data
    form = CustomUserCreationForm(data)
    if form.is_valid():
        user = form.save()
        return Response({"success": True, "username": user.username}, status=status.HTTP_201_CREATED)
    return Response({"success": False, "errors": form.errors}, status=status.HTTP_400_BAD_REQUEST)



from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.forms import AuthenticationForm

@api_view(['POST'])
def signin_view(request):
    data = request.data
    form = AuthenticationForm(request, data=data)
    if form.is_valid():
        user = form.get_user()
        refresh = RefreshToken.for_user(user)
        return Response({
            "success": True,
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        })
    return Response({"success": False, "errors": form.errors}, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken
from rest_framework_simplejwt.exceptions import TokenError

@api_view(['POST'])
def signout_view(request):
    try:
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response({"success": False, "error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create a RefreshToken object
        token = RefreshToken(refresh_token)
        
        # Blacklist the refresh token
        token.blacklist()  # This method should be available if blacklist is set up correctly
        
        return Response({"success": True}, status=status.HTTP_200_OK)
    except TokenError as e:
        return Response({"success": False, "error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"success": False, "error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def user_data_view(request):
    user = request.user
    print(request)
    # Fetch user-specific data
    user_data = {
        'username': user.username,
        'email': user.email,
        # Add any other data you need
    }
    return Response(user_data)