from rest_framework import serializers
from langchain_community.document_loaders import PyPDFLoader
from .models import PDFModel
import requests
import tempfile
import os

class PDFModelSerializers(serializers.ModelSerializer):
    class Meta:
        model = PDFModel
        fields = '__all__'
        extra_kwargs = {
            "Title" : {'required' : True},
            "URL" : {'required' : True},
            "Contents" : {'read_only' : True}
        }
        
    def create(self, validated_data):
        title = validated_data['Title']
        url = validated_data['URL']
        
        response = requests.get(url)
        response.raise_for_status()
        
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
        temp_file.write(response.content)
        temp_file.close()
        
        pdf_text = ''
        
        try:
            loader = PyPDFLoader(temp_file.name)
            docs = loader.load()
            pdf_text = '\n'.join([doc.page_content for doc in docs])
        finally:
            os.remove(temp_file.name)
        
        pdf_detail = PDFModel.objects.create(
            Title = title,
            URL = url,
            Contents = pdf_text
        )
        
        return  pdf_detail