from rest_framework import serializers
from apps.ai.models.entities import PDFModel
from apps.ai.services.bookcontents.bookurl import get_book_url
from langchain_huggingface import HuggingFaceEmbeddings

class PDFModelSerializers(serializers.ModelSerializer):
    class Meta:
        model = PDFModel
        fields = '__all__'
        extra_kwargs = {
            'Title' : {'required' : True},
            'URL' : {'required' : True},
            'Plain_contents' : {'read_only' : True},
            'Embedded_contents' : {'read_only' : True},
        }
        
    def create(self, validated_data):
        title_of_the_book = validated_data['Title']
        url = validated_data['URL']
        book_content = get_book_url(validated_data)
        
        embed = HuggingFaceEmbeddings(model_name = "sentence-transformers/all-MiniLM-L6-v2")
        
        clean_book = embed.embed_documents(book_content)
        
        return PDFModel.objects.create(
            Title = title_of_the_book,
            URL = url,
            Plain_contents = book_content,
            Embedded_contents = clean_book
        )
        
        