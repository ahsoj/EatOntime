from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from uuid import uuid4
import random, string
from django.utils import timezone

# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if email is None:
            return "User must have Email address"
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        if email is None:
            return "User must have Email address"
        user = self.create_user(email, password, **extra_fields)
        user.is_superuser = True
        user.save(using=self._db)
        return user


class GlobalUser(AbstractBaseUser, PermissionsMixin):
    objects = UserManager()
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    email = models.EmailField(
        unique=True, db_index=True, max_length=255, verbose_name="Email Address"
    )
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    role = models.CharField(max_length=10)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    USERNAME_FIELD = "email"

    def __str__(self) -> str:
        return self.email.rsplit("@")[0]

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_superuser

    @property
    def is_customer(self):
        return self.role == "customer"

    @property
    def is_driver(self):
        return self.role == "driver"

    @property
    def is_merchant(self):
        return self.role == "merchant"

    class Meta:
        indexes = [
            models.Index(fields=["role", "email", "phone_number"]),
        ]


class PasswordResetToken(models.Model):
    user = models.ForeignKey(GlobalUser, on_delete=models.CASCADE)
    token = models.CharField(max_length=50)
    created_at = models.DateTimeField(default=timezone.now)


class Addresses(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    street_l1 = models.CharField(max_length=100, null=True)
    street_l2 = models.CharField(max_length=100, null=True)
    city = models.CharField(max_length=50, null=True)
    state = models.CharField(max_length=30, null=True)
    zip_code = models.CharField(max_length=10, null=True)
    country = models.CharField(max_length=255, null=True)
    latitude = models.FloatField(null=True)
    longitude = models.FloatField(null=True)
    customer_address = models.ForeignKey(
        "Customer", on_delete=models.CASCADE, null=True
    )
    drivers_address = models.ForeignKey(
        "DeliveringDriver", on_delete=models.CASCADE, null=True
    )
    merchant_address = models.ForeignKey(
        "Restaurants", related_name="merchant_ad", on_delete=models.CASCADE, null=True
    )

    def __str__(self):
        return f"{self.street_l1}-${self.street_l2}-{self.country}"


class Restaurants(GlobalUser):
    merchant_name = models.CharField(max_length=50)
    m_restaurant_name = models.CharField(max_length=50)
    m_restaurant_logo = models.ImageField(upload_to="merchant/logo/", null=True)
    business_permit = models.ImageField(upload_to="merchant/permit/", null=True)
    address = models.ForeignKey(
        Addresses, on_delete=models.CASCADE, null=True, blank=True
    )
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.merchant_name

    def create_user(self, email, password, **extra_fields):
        extra_fields.setdefault("role", "merchant")
        return super().create_user(email, password, **extra_fields)

    class Meta:
        indexes = [models.Index(fields=["m_restaurant_name"])]


class RestaurantMenu(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    restaurant = models.ForeignKey(Restaurants, on_delete=models.CASCADE)
    date = models.DateField()
    openDay_of_week = models.CharField(max_length=50)
    menu_items = models.ManyToManyField("MenuItem")

    class Meta:
        indexes = [
            models.Index(fields=["restaurant"]),
        ]


class MenuItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    item_name = models.CharField(max_length=100)
    item_descriptions = models.TextField(max_length=500)
    item_picture = models.ImageField(upload_to="menuItem/", null=True)
    restaurant = models.ForeignKey(Restaurants, on_delete=models.CASCADE)
    current_price = models.DecimalField(max_digits=10, decimal_places=2)
    active = models.BooleanField(default=True)
    ingredients = models.TextField()
    rating = models.DecimalField(max_digits=4, decimal_places=1, default=0.0)
    category = models.CharField(max_length=200)

    class Meta:
        indexes = [
            models.Index(fields=["restaurant", "item_name"]),
        ]


class Offers(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    reason = models.TextField(null=True, blank=True)
    date_activate_from = models.DateTimeField()
    date_activate_to = models.DateTimeField()
    discount_percentage = models.DecimalField(
        default=0.05, max_digits=5, decimal_places=2
    )
    restaurant = models.ForeignKey(Restaurants, on_delete=models.CASCADE)


class Customer(GlobalUser):
    profilePic = models.ImageField(upload_to="profile/", null=True, blank=True)
    address = models.ForeignKey(
        Addresses, on_delete=models.CASCADE, null=True, blank=True
    )

    def create_user(self, email, password, **extra_fields):
        extra_fields.setdefault("role", "customer")
        return super().create_user(email, password, **extra_fields)


class DeliveringDriver(GlobalUser):
    profilePic = models.ImageField(upload_to="profile/", null=True, blank=True)
    address = models.ForeignKey(
        Addresses, on_delete=models.CASCADE, null=True, blank=True
    )
    driverLicense = models.ImageField(upload_to="dirver_license/")

    def create_user(self, email, password, **extra_fields):
        extra_fields.setdefault(
            "role", "driver"
        ) if "role" not in extra_fields else extra_fields["role"]
        return super().create_user(email, password, **extra_fields)


class Feedback(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(Customer, on_delete=models.CASCADE)
    caption = models.TextField(null=True, blank=True)
    rating = models.FloatField(max_length=2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)


class Favorite(models.Model):
    user = models.ForeignKey(Customer, on_delete=models.CASCADE)
    items = models.ManyToManyField(MenuItem)
    createdAt = models.DateTimeField(auto_now_add=True, null=True)


class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    restaurant = models.ForeignKey(Restaurants, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    order_code = models.IntegerField(unique=True, editable=False)
    delivery_charge = models.DecimalField(default=0.00, max_digits=5, decimal_places=2)
    status = models.CharField(max_length=20, default="PENDING")
    payment_status = models.BooleanField(default=False)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)

    def calculate_total_price(self):
        total_price = (OrderItem.quantity * OrderItem.price) + self.delivery_charge
        self.total_cost = total_price
        self.total_cost.save()

    def save(self, *args, **kwargs):
        # Generate a random order code if it doesn't exist
        if not self.order_code:
            order_code = "".join(random.choices(string.digits, k=10))
            while Order.objects.filter(order_code=order_code).exists():
                order_code = "".join(random.choices(string.digits, k=10))
            self.order_code = order_code

        super().save(*args, **kwargs)


class OrderItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    delivered = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        indexes = [
            models.Index(fields=["order"]),
            models.Index(fields=["menu_item"]),
        ]


class Payment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    order_process = models.ForeignKey(Order, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50)
    transaction_id = models.CharField(max_length=50)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    restaurant = models.ForeignKey(Restaurants, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["order_process"]),
        ]


# class Cart(models.Model):
#     user = models.ForeignKey(Customer, on_delete=models.CASCADE)
#     total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
#     ordered = models.BooleanField(default=False)
#     createdAt = models.DateTimeField(auto_now_add=True, null=True)


# class CartItems(models.Model):
#     cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
#     product = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
#     quantity = models.IntegerField(default=1)
#     price = models.DecimalField(max_digits=10, decimal_places=2)
