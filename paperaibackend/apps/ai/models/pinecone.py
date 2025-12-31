from pinecone import Pinecone
from pinecone_plugins.assistant.models.chat import Message
import tempfile
from apps.ai.models.entities import PDFModel
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from env_config import Config

class PineconeEmbeddings(serializers.Serializer):
    PINECONE_API_KEY = Config.PINECONE_API_KEY
    
    Book_Name = serializers.CharField()
    try:
        plain_book = PDFModel.objects.get(Title = Book_Name)
    except PDFModel.DoesNotExist:
        raise ValidationError({'Message':{'Book Name':f'{Book_Name}', 'PaperAI':'This book does not exists. Please, read other books. Thank you!'}})
    
    book = plain_book.Plain_contents
    
    pc = Pinecone(api_key=PINECONE_API_KEY)
    assistant = pc.assistant.Assistant(
        assistant_name="paperai", 
    )
    
    with tempfile.NamedTemporaryFile(mode="w+", suffix=".txt", delete=False) as tmp_file:
        for line in book:
            tmp_file.write(line + "\n")
        tmp_file_path = tmp_file.name
    
    response = assistant.upload_file(
        file_path=tmp_file_path,
        timeout=None
    )