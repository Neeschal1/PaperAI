from django.shortcuts import render
from rest_framework import generics
from apps.ai.models.entities import PDFModel
from .serializers import PDFModelSerializers
from rest_framework.permissions import AllowAny

class PDFModelSerializersView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = PDFModel.objects.all()
    serializer_class = PDFModelSerializers
