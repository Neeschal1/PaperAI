from django.shortcuts import render
from rest_framework import generics
from apps.ai.models.entities import PDFModel
from .serializers import PDFModelSerializers

class PDFModelSerializersView(generics.ListCreateAPIView):
    queryset = PDFModel.objects.all()
    serializer_class = PDFModelSerializers
