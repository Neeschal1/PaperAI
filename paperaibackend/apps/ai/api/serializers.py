from rest_framework import serializers
from apps.ai.models.entities import PDFModel
from apps.ai.services.bookcontents.bookurl import get_book_url
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
        
        return PDFModel.objects.create(
            Title = title_of_the_book,
            URL = url,
            Plain_contents = book_content,
        )
        
class PineconeEmbeddings(serializers.Serializer):
    Book_Name = serializers.CharField()
    Queries = serializers.CharField()
        
        
        