from django.db import models
from django.contrib.auth.models import User

class PDFModel(models.Model):
    Title = models.CharField(max_length=50, default='Name of the book', blank=True)
    URL = models.URLField(default='www.bookurl.com', blank=True)
    Uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, default=1, blank=True, null=True)
    Plain_contents = models.TextField(default='', blank=True)
    Embedded_contents = models.TextField(default='', blank='')
    def __str__(self):
        return self.Title
    
class Communication(models.Model):
    PDF = models.ForeignKey(PDFModel, on_delete=models.CASCADE, default=1, blank=True, null=True)    
    User_query = models.CharField(max_length=100)
    AI_response = models.TextField()
    def __str__(self):
        return self.User_query