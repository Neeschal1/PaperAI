from django.shortcuts import render
from .serializers import UserAccountSignupSerializers, UserAccountLoginSerializers
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import ValidationError
from django.contrib.auth.hashers import check_password

class UserAccountSignupSerializersView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserAccountSignupSerializers
    
class UserAccountLoginSerializersView(APIView):
    def post(self, request):
        serializers = UserAccountLoginSerializers(data = request.data)
        serializers.is_valid(raise_exception=True)
        
        Email = serializers.validated_data['Email']
        Password = serializers.validated_data['Password']
        
        try:
            user = User.objects.filter(email = Email).exists()
        except User.DoesNotExist:
            raise ValidationError({'Message':'No user exists with the email!'})
        
        if not check_password(Password, user.password):
            raise ValidationError({'Message':'Invalid Credentials!'})
        
        return user