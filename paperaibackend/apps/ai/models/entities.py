from django.db import models
from django.contrib.auth.models import User
from pgvector.django import VectorField

class PDFModel(models.Model):
    Title = models.CharField(max_length=50)
    URL = models.URLField()
    Plain_contents = models.TextField()
    Embedded_contents = VectorField(dimensions=384)
    def __str__(self):
        return self.Title
    
class Communication(models.Model):
    PDF = models.ForeignKey(PDFModel, on_delete=models.CASCADE, default=1, blank=True, null=True)    
    User_query = models.CharField(max_length=100)
    AI_response = models.TextField()
    def __str__(self):
        return self.User_query
    