from django.db import models
from django.contrib.auth.models import User

class PDFModel(models.Model):
    Title = models.CharField(max_length=50, default='Name of the book', blank=True)
    URL = models.URLField(default='www.bookurl.com', blank=True)
    Contents = models.TextField(default='', blank=True)
    def __str__(self):
        return self.Title