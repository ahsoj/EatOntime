from rest_framework import routers
from django.urls import path
from systemauth.views import Auth0LoginView, Auth0CallbackView, LogoutView


# router = routers.SimpleRouter(trailing_slash=False)

# router.register('login', Auth0LoginView, basename="login")
# router.register('logout', LogoutView, basename="logout")
# router.register('callback', Auth0CallbackView, basename='callback')

urlpatterns = [
    path('login/', Auth0LoginView.as_view(), name="login"),
    path('logout/', LogoutView.as_view(), name="logout"),
    path('callback/', Auth0CallbackView.as_view(), name="callback"),
    # *router.urls
]
