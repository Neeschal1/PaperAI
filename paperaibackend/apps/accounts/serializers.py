from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.exceptions import ValidationError 

class UserAccountSignupSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password']
        extra_kwargs = {
            'id' : {'read_only' : True},
            'username' : {'required' : True},
            'email' : {'required' : True},
            'first_name' : {'required' : True},
            'last_name' : {'required' : True},
            'password' : {'required' : True},
        }
        
    def create(self, validated_data):
        Username = validated_data['username']
        Email = validated_data['email']
        Firstname = validated_data['first_name']
        Lastname = validated_data['last_name']
        Password = validated_data['password']
        hashed_password = make_password(Password)
        if (User.email == Email):
            raise ValidationError({'Message':'Account with this email already exists. Try signing up a new account with a new email.'})
        user = User.objects.create(
            email = Email,
            username = Username,
            first_name = Firstname,
            last_name = Lastname,
            password = hashed_password 
        )
        return user
    
class UserAccountLoginSerializers(serializers.Serializer):
    Email = serializers.EmailField()
    Password = serializers.CharField()