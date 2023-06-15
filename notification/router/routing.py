from django.urls import re_path

from notification import consumers

websocket_urlpatterns = [
    re_path(r"ws/notify/(?P<uid>\w+)/$", consumers.NotificationConsumer.as_asgi()),
]
