from django.middleware.csrf import get_token
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model, update_session_auth_hash
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from .serializers import UserSerializer
from .forms import CustomUserCreationForm

User = get_user_model()

def csrf_token_view(request):
    return JsonResponse({'csrfToken': get_token(request)})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_auth(request):
    return Response({'isAuthenticated': True})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({'message': 'Protected view'})

@api_view(['POST'])
def signup_view(request):
    data = request.data
    form = CustomUserCreationForm(data)
    if form.is_valid():
        user = form.save()
        return Response({"success": True, "username": user.username}, status=status.HTTP_201_CREATED)
    return Response({"success": False, "errors": form.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def signin_view(request):
    data = request.data
    form = AuthenticationForm(request, data=data)
    if form.is_valid():
        user = form.get_user()
        refresh = RefreshToken.for_user(user)

        serializer = UserSerializer(user)

        return Response({
            "user": serializer.data,
            "success": True,
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        })
    return Response({"success": False, "errors": form.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def signout_view(request):
    # Inform the client to remove the token.
    return Response({"success": True}, status=status.HTTP_200_OK)

@api_view(['GET'])
def validate_token(request):
    user = AnonymousUser()
    try:
        user = JWTAuthentication().authenticate(request)[0]
    except InvalidToken:
        return Response({"success": False, "errors": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)

    if user is None:
        return Response({"success": False, "errors": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)

    serializer = UserSerializer(user)
    return Response({"success": True, "user": serializer.data})

@api_view(['PUT'])
def update_user_view(request):
    user = request.user
    data = request.data

    serializer = UserSerializer(user, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        updated_fields = [field for field in data.keys() if field != 'password']
        message = f"Successfully updated: {', '.join(updated_fields)}"
        return Response({"success": True, "message": message, "user": serializer.data}, status=status.HTTP_200_OK)
    return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def change_password_view(request):
    user = request.user
    form = PasswordChangeForm(user, request.data)
    if form.is_valid():
        user = form.save()
        update_session_auth_hash(request, user)
        return Response({"success": True, "message": "Password changed successfully"}, status=status.HTTP_200_OK)
    return Response({"success": False, "errors": form.errors}, status=status.HTTP_400_BAD_REQUEST)