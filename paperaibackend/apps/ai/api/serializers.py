from rest_framework import serializers
from apps.ai.models.entities import PDFModel, Communication
from apps.ai.services.bookembeddings import book_embeddings
from apps.ai.services.bookcontents.booktitle import get_book_title
from apps.ai.services.bookcontents.bookurl import get_book_url
from apps.ai.services.bookcontents.embedded_book import full_embedded_book

class PDFModelSerializers(serializers.ModelSerializer):
    class Meta:
        model = PDFModel
        fields = '__all__'
        extra_kwargs = {
            'Title' : {'required' : True},
            'URL' : {'required' : True},
            # 'Uploaded_by' : {'required' : True},
            'Plain_contents' : {'read_only' : True},
            'Embedded_contents' : {'read_only' : True},
        }
        
    def create(self, validated_data):
        # title_of_the_book = get_book_title(validated_data)
        title_of_the_book = validated_data['Title']
        url = validated_data['URL']
        # name_of_uploader_of_the_book = validated_data['Uploaded_by']
        book_content = get_book_url(validated_data)
        embedded_book = full_embedded_book(book_content)
        
        return PDFModel.objects.create(
            Title = title_of_the_book,
            URL = url,
            Plain_contents = book_content,
            Embedded_contents = embedded_book
        )
        
        