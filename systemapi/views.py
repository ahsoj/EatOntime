from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, permissions, views
from rest_framework.decorators import action, api_view
from django.conf import settings
from rest_framework.response import Response
from systemapi.models import (
    Payment,
    Favorite,
    Order,
    OrderItem,
    Customer,
    DeliveringDriver,
)
from systemapi.models import Restaurants, MenuItem

from systemapi.serializers import (
    MenuItemSerializer,
    PaymentSerializer,
    FavoriteSerializer,
    OrderSerializer,
    OrderItemSerializer,
)

import stripe

stripe.api_key = settings.STRIPE["SECRET_KEY"]


@api_view(["POST"])
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
        amount=100,
        currency="usd",
        payment_method_types=["card"],
        receipt_email="test@gmail.com",
    )
    return Response(status=status.HTTP_200_Ok)


# class CreatePaymentView(viewsets.ModelViewSet):
#     queryset = Payment.objects.all()
#     serializer_class = PaymentSerializer

#     def post(self, request):
#         amount = request.data.get("amount")
#         payment_method = request.data.get("payment_method")
#         customer_id = request.data.get("customer_id")
#         restaurant_id = request.data.get("restaurant_id")

#         customer = Customer.objects.get(id=customer_id)
#         restaurant = Restaurants.objects.get(id=restaurant_id)

#         if payment_method == "card":
#             token = request.data.get("token")
#             charge = stripe.Charge.create(
#                 amount=int(amount * 100),
#                 currency="usd",
#                 source=token,
#                 description="Food delivery payment",
#             )
#             transaction_id = charge.id
#         elif payment_method == "cash":
#             transaction_id = "cash"

#         payment = Payment.objects.create(
#             amount=amount,
#             payment_method=payment_method,
#             transaction_id=transaction_id,
#             customer=customer,
#             restaurant=restaurant,
#         )

#         return Response({"payment": PaymentSerializer(payment).data})


class OrderViewSets(viewsets.ModelViewSet):
    serializer_class = OrderSerializer

    def get_queryset(self):
        order = Order.objects.all()
        queryset = Order.objects.all()
        o_id = self.request.query_params.get("oid")
        m_id = self.request.query_params.get("mid")
        c_id = self.request.query_params.get("cid")
        if o_id is not None:
            queryset = queryset.filter(id=o_id)
        elif m_id is not None:
            queryset = queryset.filter(restaurant__id=m_id)
        elif c_id is not None:
            queryset = queryset.filter(customer__id=c_id)
        return queryset

    def perform_create(self, serializer):
        return super().perform_create(serializer)

    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    # def perform_destroy(self, instance):
    # return super().perform_destroy(instance)


class OrderItemsViewSets(viewsets.ModelViewSet):
    serializer_class = OrderItemSerializer

    def get_queryset(self):
        queryset = OrderItem.objects.all()
        oi_id = self.request.query_params.get("oiid")
        mi_id = self.request.query_params.get("miid")
        ci_id = self.request.query_params.get("ciid")
        if oi_id is not None:
            queryset = queryset.filter(id=oi_id)
        elif mi_id is not None:
            queryset = queryset.filter(restaurant__id=mi_id)
        elif ci_id is not None:
            queryset = queryset.filter(order__id=ci_id)
        return queryset

    def perform_create(self, serializer):
        print(serializer)
        # order = Order.objects.filter(id=order_id)
        return super().perform_create(serializer)

    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    def perform_destroy(self, instance):
        if instance.delivered:
            instance.delete()


class FavoriteViewsets(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Favorite.objects.all()
        user_id = self.request.query_params.get("user")
        if user_id is not None:
            queryset = queryset.filter(user__id=user_id)
        return queryset

    def perform_create(self, serializer):
        return super().perform_create(serializer)

    def perform_destroy(self, instance):
        return super().perform_destroy(instance)


# class CartViewsets(viewsets.ModelViewSet):
#     serializer_class = CartSerializer
#     # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

#     def get_queryset(self):
#         queryset = Cart.objects.all()
#         user_id = self.request.query_params.get("user")
#         if user_id is not None:
#             queryset = queryset.filter(user__id=user_id)
#         return queryset

#     def perform_create(self, serializer):
#         cart = serializer.save(user=self.request.user)
#         item_data = self.request.data["items"]
#         item_id = [d["id"] for d in item_data]
#         menu_item = get_object_or_404(MenuItem, id=item_id[0])
#         cart.items.add(menu_item)

#     @action(detail=True, methods=["post"])
#     def add_item(self, request, pk=None):
#         return self.create(request)

#     def perform_destroy(self, instance):
#         if instance.ordered:
#             instance.delete()


# class CartItemsViewSets(viewsets.ModelViewSet):
#     queryset = CartItems.objects.all()
#     serializer_class = CartItemSerializer


# class AddressViewsets(viewsets.ModelViewSet):
#     queryset = Addresses.objects.all()
#     serializer_class = AddressSerializer
