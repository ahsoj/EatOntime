from systemauth.serializers import LoginSerializer
from systemapi.serializers import CustomerAccountSerilizer
from systemapi.serializers import CustomerRegisterSerializer
from systemapi.serializers import DeliveryDriverAccountSerilizer
from systemapi.serializers import DeliveryDriverRegisterSerializer
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status, views, permissions, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.authtoken.models import Token
from django.shortcuts import render
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import action
from django.utils.crypto import get_random_string
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.settings import api_settings
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.conf import settings
from django.urls import reverse
from django.core.mail import send_mail
from rest_framework.response import Response
from systemapi.models import GlobalUser, PasswordResetToken, Customer, DeliveringDriver

# Create your views here.


class LoginViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)
    http_method_names = ["post"]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class CustomerAccountViewSets(viewsets.ModelViewSet):
    serializer_class = CustomerAccountSerilizer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)  # temporary
    # filter_backends = [filters.OrderingFilter]

    def get_queryset(self):
        uid = self.request.query_params.get("uid")
        if self.request.user.is_superuser:
            return Customer.objects.all()
        elif uid is not None:
            return DeliveringDriver.objects.filter(id=uid)

    # def get_object(self):
    #     lookup_field_value = self.kwargs[self.lookup_field]
    #     obj = Customer.objects.get(lookup_field_value)
    #     self.check_object_permissions(self.request, obj)
    #     return obj


class CustomerRegisterViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = CustomerRegisterSerializer
    permission_classes = (AllowAny,)
    http_method_names = ["post"]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        res = {"refresh": str(refresh), "access": str(refresh.access_token)}

        return Response(
            {
                "user": serializer.data,
                "refresh": res["refresh"],
                "token": res["access"],
            },
            status=status.HTTP_201_CREATED,
        )


class DriversAccountViewSets(viewsets.ModelViewSet):
    serializer_class = DeliveryDriverAccountSerilizer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)  # temporary
    # filter_backends = [filters.OrderingFilter]

    def get_queryset(self):
        uid = self.request.query_params.get("uid")
        if self.request.user.is_superuser:
            return DeliveringDriver.objects.all()
        elif uid is not None:
            return DeliveringDriver.objects.filter(id=uid)

    # def get_object(self):
    #     lookup_field_value = self.kwargs[self.lookup_field]
    #     obj = DeliveringDriver.objects.get(lookup_field_value)
    #     self.check_object_permissions(self.request, obj)
    #     return obj


class DriversRegisterViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = DeliveryDriverRegisterSerializer
    permission_classes = (AllowAny,)
    http_method_names = ["post"]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        res = {"refresh": str(refresh), "access": str(refresh.access_token)}

        return Response(
            {
                "user": serializer.data,
                "refresh": res["refresh"],
                "token": res["access"],
            },
            status=status.HTTP_201_CREATED,
        )


class RefreshViewSet(ViewSet, TokenRefreshView):
    permission_classes = (AllowAny,)
    http_method_names = ["post"]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class CreatePasswordResetTokenView(views.APIView):
    def post(self, request):
        email = request.data.get("email")
        user = GlobalUser.objects.get(email=email)
        token = get_random_string(length=50)
        PasswordResetToken.objects.create(user=user, token=token)
        reset_url = settings.FRONTEND_URL + reverse(
            "password_reset_confirm", args=[token]
        )
        subject = "Password Reset"
        message = f"Please click the following link to reset your password: {reset_url}"
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [email]
        send_mail(subject, message, from_email, recipient_list)
        return Response({"success": "Password reset token created and email sent"})


class PasswordResetView(views.APIView):
    def post(self, request):
        token = request.data.get("token")
        uidb64 = request.data.get("uidb64")
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = GlobalUser.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, GlobalUser.DoesNotExist):
            user = None
        if user is not None and default_token_generator.check_token(user, token):
            new_password = request.data.get("new_password")
            user.set_password(new_password)
            user.save()
            login(request, user)
            jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            # jwt_encode
