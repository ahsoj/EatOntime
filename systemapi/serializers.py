from rest_framework import serializers
from merchant.serializers import MenuItemSerializer
from django.core.exceptions import ObjectDoesNotExist
from systemapi.models import (
    Order,
    OrderItem,
    Payment,
    Feedback,
    Customer,
    DeliveringDriver,
    Favorite,
    Addresses,
)


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


class CustomerAccountSerilizer(serializers.ModelSerializer):
    # profilePic = serializers.ImageField()
    # address = AddressSerializer()

    class Meta:
        model = Customer
        fields = "__all__"


class CustomerRegisterSerializer(CustomerAccountSerilizer):
    address = AddressSerializer()
    email = serializers.EmailField(required=True, write_only=True, max_length=128)
    password = serializers.CharField(
        max_length=125,
        min_length=8,
        write_only=True,
        required=True,
    )

    class Meta:
        model = Customer
        fields = [
            "profilePic",
            "email",
            "password",
            "phone_number",
            "role",
            "address",
        ]
        read_only_fields = ["id", "is_active", "role"]

    def create(self, validated_data):
        try:
            user = Customer.objects.get(email=validated_data["email"])
        except ObjectDoesNotExist:
            validated_data["role"] = "customer"
            address = validated_data.pop("address")
            user = Customer.objects.create_user(**validated_data)
            Addresses.objects.create(customer_address=user, **address)
        return user


class DeliveryDriverAccountSerilizer(serializers.ModelSerializer):
    profilePic = serializers.ImageField()
    driverLicense = serializers.ImageField()
    address = AddressSerializer()

    class Meta:
        model = DeliveringDriver
        fields = "__all__"


class DeliveryDriverRegisterSerializer(DeliveryDriverAccountSerilizer):
    address = AddressSerializer()
    email = serializers.EmailField(required=True, write_only=True, max_length=128)
    password = serializers.CharField(
        max_length=125,
        min_length=8,
        write_only=True,
        required=True,
    )

    class Meta:
        model = DeliveringDriver
        fields = [
            "profilePic",
            "driverLicense",
            "email",
            "password",
            "phone_number",
            "role",
            "address",
        ]
        read_only_fields = ["id", "is_active", "role"]

    def create(self, validated_data):
        try:
            user = DeliveringDriver.objects.get(email=validated_data["email"])
        except ObjectDoesNotExist:
            validated_data["role"] = "driver"
            address = validated_data.pop("address")
            user = DeliveringDriver.objects.create_user(**validated_data)
            Addresses.objects.create(drivers_address=user, **address)
        return user


class OffersSerializer(serializers.ModelSerializer):
    restaurant = serializers.HyperlinkedRelatedField(
        many=False, read_only=True, view_name="restaurant-detail"
    )

    class meta:
        fields = [
            "id",
            "reason",
            "date_activate_from",
            "date_activate_to",
            "discount_percentage",
            "restaurant",
        ]
        read_only_fields = ["id"]


# class CartSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Cart
#         fields = "__all__"


# class CartItemSerializer(serializers.ModelSerializer):
#     # product = MenuItemSerializer(many=True, read_only=True)

#     class Meta:
#         model = Cart
#         fields = "__all__"


class FavoriteSerializer(serializers.ModelSerializer):
    items = MenuItemSerializer(many=True)

    class Meta:
        model = Favorite
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    # customer = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    # restaurant = serializers.HyperlinkedRelatedField(
    #     many=False, read_only=True, view_name="restaurant-detail"
    # )

    class Meta:
        model = Order
        fields = [
            "id",
            "customer",
            "restaurant",
            "order_date",
            "order_code",
            "total_cost",
            "delivery_charge",
            "status",
            "payment_status",
        ]
        read_only_fields = ["id", "order_code", "payment_status"]


class OrderItemSerializer(serializers.ModelSerializer):
    menu_item = MenuItemSerializer

    class Meta:
        model = OrderItem
        fields = ["id", "order", "quantity", "delivered", "price", "menu_item"]
        read_only_fields = ["id"]


class FeedbackSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = Feedback
        fields = ["id", "user", "caption", "rating", "createdAt"]
        read_only_fields = ["id", "createdAt"]


class PaymentSerializer(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = Payment
        fields = [
            "id",
            "amount",
            "order",
            "payment_method",
            "transaction_id",
            "customer",
            "restaurant",
            "date",
        ]
