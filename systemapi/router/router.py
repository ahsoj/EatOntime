from django.urls import path
from rest_framework.routers import DefaultRouter
from systemauth.views import (
    CustomerAccountViewSets,
    LoginViewSet,
    CustomerRegisterViewSet,
    RefreshViewSet,
    CreatePasswordResetTokenView,
    DriversRegisterViewSet,
    DriversAccountViewSets,
)
from systemapi.views import (
    # CreatePaymentView,
    FavoriteViewsets,
    OrderItemsViewSets,
    OrderViewSets,
    test_payment,
)

from merchant.views import (
    RestaurantViewset,
    RestaurantRegisterViewSet,
    MenuItemViewsets,
    RestaurantMenuViewSet,
)


router = DefaultRouter()

router.register(r"auth/login/user", LoginViewSet, basename="login_user")
router.register(
    r"auth/register/customer", CustomerRegisterViewSet, basename="register_user"
)
router.register(
    r"auth/register/merchant", RestaurantRegisterViewSet, basename="register_merchant"
)
router.register(
    r"auth/register/drivers", DriversRegisterViewSet, basename="register_drivers"
)
router.register(r"auth/refresh/user", RefreshViewSet, basename="refresh")

router.register(
    r"customer_account", CustomerAccountViewSets, basename="customer_account"
)

router.register(r"merchant_account", RestaurantViewset, basename="merchant_account")
router.register(r"drivers_account", DriversAccountViewSets, basename="drivers_account")
router.register(r"order", OrderViewSets, basename="order")
router.register(r"order_items", OrderItemsViewSets, basename="orderItems")
router.register(r"restaurant_menu", RestaurantMenuViewSet, basename="restaurant_menu")
router.register(r"menu_items", MenuItemViewsets, basename="menuItems")
# router.register(r"payment", CreatePaymentView, basename="payment_process")
router.register(r"favorite", FavoriteViewsets, basename="favorite")


urlpatterns = [
    # path("create-order/", CreateOrderView.as_view(), name="create-order"),
    path("create-payment/", test_payment, name="create-payment"),
    path(
        "create-password-reset-token/",
        CreatePasswordResetTokenView.as_view(),
        name="create-password-reset-token",
    ),
    *router.urls,
]
