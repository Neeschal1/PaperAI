from django.urls import path
from . import views
from django.http import JsonResponse

def accountshome(request):
    return JsonResponse({'Message':'Hey, you are in the official pathway of accounts section of paper ai project backend. Welcome!!!'})

urlpatterns = [
    path('', accountshome, name='accountshome'),
    path('signup/', views.UserAccountSignupSerializersView.as_view(), name='UserAccountSignupSerializersView')
]
