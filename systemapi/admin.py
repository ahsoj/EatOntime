from django.contrib import admin
from django.contrib.auth.models import Group
from systemapi.models import (
    Customer,
    MenuItem,
    Order,
    OrderItem,
    Payment,
    Feedback,
    Favorite,
    DeliveringDriver,
    Addresses,
    PasswordResetToken,
    GlobalUser,
    Restaurants,
    RestaurantMenu,
    Offers,
)

# Register your models here.

admin.site.register(GlobalUser)
admin.site.register(Customer)
admin.site.register(DeliveringDriver)
admin.site.register(Addresses)
admin.site.register(RestaurantMenu)
admin.site.register(MenuItem)
admin.site.register(Offers)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Payment)
admin.site.register(Feedback)
admin.site.register(PasswordResetToken)
admin.site.register(Favorite)
admin.site.register(Restaurants)
admin.site.unregister(Group)
