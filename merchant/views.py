from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from systemapi.models import Restaurants, MenuItem, RestaurantMenu
from merchant.serializers import (
    RestaurantAccountSerilizer,
    RestaurantRegisterSerializer,
    MenuItemSerializer,
    RestaurantMenuSerializer
)
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.


class RestaurantViewset(viewsets.ModelViewSet):
    queryset = Restaurants.objects.all()
    serializer_class = RestaurantAccountSerilizer
    permission_classes = (permissions.IsAuthenticated,)


class RestaurantRegisterViewSet(viewsets.ModelViewSet, TokenObtainPairView):
    serializer_class = RestaurantRegisterSerializer
    permission_classes = (permissions.AllowAny,)
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
    

class RestaurantMenuViewSet(viewsets.ModelViewSet):
    serializer_class = RestaurantMenuSerializer
    
    def get_queryset(self):
        queryset = RestaurantMenu.objects.all()
        item_id = self.request.query_params.get("item")
        if item_id is not None:
            queryset = queryset.filter(id=item_id)
        return queryset


class MenuItemViewsets(viewsets.ModelViewSet):
    serializer_class = MenuItemSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = MenuItem.objects.all()
        item_id = self.request.query_params.get("item")
        if item_id is not None:
            queryset = queryset.filter(id=item_id)
        return queryset
