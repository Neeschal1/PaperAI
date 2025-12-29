from django.urls import path
from apps.ai.api import views
from django.http import JsonResponse

def aihome(request):
    return JsonResponse({'Message':'Hey, you are in the official pathway of ai section of paper ai project backend. Welcome!!!'})

urlpatterns = [
    path('', aihome, name='aihome'),
    path('pdfcontent/', views.PDFModelSerializersView.as_view(), name='PDFModelSerializersView'),
    # path('chats/', views.CommunicationSerializersView.as_view(), name='CommunicationSerializersView'),
]
