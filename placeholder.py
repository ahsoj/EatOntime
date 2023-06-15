from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers, viewsets
from rest_framework.permissions import IsAuthenticated


class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError(_("The Username field must be set"))
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(username, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    role = models.CharField(max_length=10, default="customer")

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_customer(self):
        return self.role == "customer"

    @property
    def is_merchant(self):
        return self.role == "erchant"


class Customer(CustomUser):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def create_user(self, username, password=None, **extra_fields):
        extra_fields.setdefault("role", "customer")
        return super().create_user(username, password, **extra_fields)


class Merchant(CustomUser):
    business_name = models.CharField(max_length=50)

    def __str__(self):
        return self.business_name

    def create_user(self, username, password=None, **extra_fields):
        extra_fields.setdefault("role", "erchant")
        return super().create_user(username, password, **extra_fields)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("id", "username", "email", "role")


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = CustomUser.objects.all()
        if self.request.user.is_superuser:
            return queryset
        elif self.request.user.is_merchant:
            queryset = queryset.filter(role="erchant")
        else:
            queryset = queryset.filter(role="customer")
        return queryset
