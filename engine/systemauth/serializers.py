from systemapi.models import (
    GlobalUser,
    PasswordResetToken,
)
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login


class GlobalUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalUser
        fields = [
            "id",
            "email",
            "password",
            "phone_number",
            "createdAt",
            "role",
            "updatedAt",
        ]
        read_only_field = ["id", "createdAt", "updatedAt", "role"]


class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        infos = GlobalUserSerializer(self.user).data

        data["uid"] = infos["id"]
        data["role"] = infos["role"]
        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data


class PasswordResetTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordResetToken
        fields = ["id", "user", "token", "created_at"]


# class RegisterSerializer(GlobalUserSerializer):
#     email = serializers.EmailField(required=True, write_only=True, max_length=128)
#     password = serializers.CharField(
#         max_length=125,
#         min_length=8,
#         write_only=True,
#         required=True,
#     )

#     class Meta:
#         model = GlobalUser
#         fields = ["id", "email", "password"]

#     def create(self, validated_data):
#         try:
#             user = GlobalUser.objects.get(email=validated_data["email"])
#         except ObjectDoesNotExist:
#             user = GlobalUser.objects.create_user(**validated_data)
#         return user
