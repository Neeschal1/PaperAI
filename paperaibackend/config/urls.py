from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def home(request):
    return JsonResponse({'Message':'Hi, this is the initial pathway of django backend. welcome!!!'})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('accounts/', include('apps.accounts.urls')),
    path('ai/', include('apps.ai.urls')),
]
