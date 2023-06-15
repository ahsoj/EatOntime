from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist
from systemapi.models import Addresses, Restaurants, RestaurantMenu, MenuItem


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Addresses
        fields = [
            "id",
            "street_l1",
            "street_l2",
            "city",
            "state",
            "zip_code",
            "country",
            "longitude",
            "latitude",
        ]
        read_only_fields = ["id"]


class RestaurantAccountSerilizer(serializers.ModelSerializer):
    m_restaurant_logo = serializers.ImageField()
    business_permit = serializers.ImageField()
    address = AddressSerializer()
    # address = serializers.PrimaryKeyRelatedField(queryset=Address.objects.all())

    class Meta:
        model = Restaurants
        fields = "__all__"


class RestaurantRegisterSerializer(RestaurantAccountSerilizer):
    address = AddressSerializer()
    email = serializers.EmailField(required=True, write_only=True, max_length=128)
    password = serializers.CharField(
        max_length=125,
        min_length=8,
        write_only=True,
        required=True,
    )

    class Meta:
        model = Restaurants
        fields = [
            "merchant_name",
            "m_restaurant_name",
            "m_restaurant_logo",
            "business_permit",
            "is_verified",
            "email",
            "password",
            "phone_number",
            "role",
            "address",
        ]
        read_only_fields = ["id", "is_active", "is_verified", "role"]

    def create(self, validated_data):
        try:
            user = Restaurants.objects.get(email=validated_data["email"])
        except ObjectDoesNotExist:
            validated_data["role"] = "merchant"
            address = validated_data.pop("address")
            user = Restaurants.objects.create_user(**validated_data)
            Addresses.objects.create(merchant_address=user, **address)
        return user


class RestaurantMenuSerializer(serializers.ModelSerializer):
    restaurant = serializers.HyperlinkedRelatedField(
        many=False, read_only=True, view_name="restaurant-detail"
    )

    class meta:
        model = RestaurantMenu
        fields = [
            "id",
            "restaurant",
            "date",
            "openDay_of_week",
            "menu_items",
        ]
        read_only_fields = ["id"]


class MenuItemSerializer(serializers.ModelSerializer):
    # restaurant = serializers.HyperlinkedRelatedField(
    #     many=False, read_only=True, view_name="restaurant-detail"
    # )

    class Meta:
        model = MenuItem
        fields = [
            "id",
            "item_name",
            "item_descriptions",
            "item_picture",
            "restaurant",
            "current_price",
            "ingredients",
            "category",
            "active",
        ]
        read_only_fields = ["id"]
