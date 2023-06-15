from django.shortcuts import render, redirect
from django.conf import settings
from django.urls import reverse
from urllib.parse import quote_plus, urlencode

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from authlib.integrations.django_client import OAuth

# Create your views here.


# oauth = OAuth()


# oauth.register(
#     'auth0',
#     client_id=settings.AUTH0_CLIENT_ID,
#     client_secret=settings.AUTH0_CLIENT_SECRET,
#     client_kwargs={
#         'scope': 'openid profile email'
#     },
#     server_metadata_url=f"https://{settings.AUTH0_DOMAIN}/well-known/openid-configuration",
# )


# def login(request):
#     return oauth.auth0.authorize_redirect(
#         request, request.build_absolute_uri(reverse('callback'))
#     )


# def callback(request):
#     token = oauth.auth0.authorize_access_token(request)
#     request.session['user'] = token
#     return redirect(request.build_absolute_uri('index'))


# def logout(request):
#     request.session.clear()

#     return redirect(
#         f"http://{settings.AUTH0_DOMAIN}/v2/logout?"
#         + urlencode(
#         {
#             'returnTo': request.build_absolute_uri(reverse('index')),
#             'client_id': settings.AUTH0_CLIENT_ID
#         }
#         )
#     )


# class Auth0LoginView(APIView):
#     permission_classes = [AllowAny]

#     def get(self, request):
#         oauth = OAuth()
#         oauth.register(
#             'auth0',
#             client_id=settings.AUTH0_CLIENT_ID,
#             client_secret=settings.AUTH0_CLIENT_SECRET,
#             client_kwargs={
#                 'cope': 'openid profile email'
#             },
#             server_metadata_url=f"https://{settings.AUTH0_DOMAIN}/.well-known/openid-configuration",
#         )
#         authorization_url = oauth.auth0.authorize_redirect(
#             request, redirect_uri=request.build_absolute_uri('/callback')
#             )
#         return Response({'authorization_url': authorization_url})


# class LogoutView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         request.session.clear()

#         return Response({
#             'redirect_to': f"https://{settings.AUTH0_DOMAIN}/v2/logout?"
#             + urlencode(
#                 {
#                     'returnTo': request.build_absolute_uri('/'),
#                     'client_id': settings.AUTH0_CLIENT_ID
#                 },
#                 quote_via=quote_plus,
#             )
#         })


# class Auth0CallbackView(APIView):
#     def get(self, request):
#         oauth = OAuth()
#         oauth.register(
#             'auth0',
#             client_id=settings.AUTH0_CLIENT_ID,
#             client_secret=settings.AUTH0_CLIENT_SECRET,
#             client_kwargs={
#                 'cope': 'openid profile email'
#             },
#             server_metadata_url=f"https://{settings.AUTH0_DOMAIN}/.well-known/openid-configuration",
#         )
#         token = oauth.auth0.authorize_access_token(
#             request, redirect_uri=request.build_absolute_uri('/callback')
#             )
#         return Response({'token': token})

