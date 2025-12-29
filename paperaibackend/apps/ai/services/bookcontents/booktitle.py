from apps.ai.models.entities import PDFModel
from rest_framework.exceptions import ValidationError

def get_book_title(validated_data):
    book_title = validated_data['Title']
    try:
        book = PDFModel.objects.get(Title = book_title)
    except PDFModel.DoesNotExist:
        raise ValidationError(f'The book with the name: {book} already exists inside PaperAI. Provide something new book. Thank you!!!')
    return book
