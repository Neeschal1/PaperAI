from django.db import models
from django.contrib.auth.models import User

class PDFModel(models.Model):
    Title = models.CharField(max_length=50, default='Name of the book', blank=True)
    URL = models.URLField(default='www.bookurl.com', blank=True)
    Plain_contents = models.TextField(default='', blank=True)
    Embedded_contents = models.TextField(default='', blank='')
    def __str__(self):
        return self.Title