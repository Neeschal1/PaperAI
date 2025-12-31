from django.shortcuts import render
from rest_framework import generics
from apps.ai.models.entities import PDFModel
from .serializers import PDFModelSerializers, PineconeEmbeddings
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from env_config import Config
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from pinecone_plugins.assistant.models.chat import Message
from rest_framework.exceptions import ValidationError
from pinecone import Pinecone
import tempfile


class PDFModelSerializersView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = PDFModel.objects.all()
    serializer_class = PDFModelSerializers


@method_decorator(csrf_exempt, name="dispatch")
class PineconeEmbeddingsView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializers = PineconeEmbeddings(data=request.data)
        serializers.is_valid(raise_exception=True)
        bookname = serializers.validated_data["Book_Name"]
        user_query = serializers.validated_data["Queries"]
        PINECONE_API_KEY = Config.PINECONE_API_KEY

        try:
            plain_book = PDFModel.objects.get(Title=bookname)
        except PDFModel.DoesNotExist:
            raise ValidationError(
                f"The book {bookname} does not exists in our database. Please, select other books or contribute the book to the PaperAI world. Thank you!"
            )

        book = plain_book.Plain_contents
        pc = Pinecone(api_key=PINECONE_API_KEY)
        assistant = pc.assistant.Assistant(
            assistant_name="paperai",
        )

        with tempfile.NamedTemporaryFile(
            mode="w",
            encoding="utf-8",
            suffix=".txt",
            delete=False
        ) as f:
            f.write(book)
            tmp_path = f.name

        response = assistant.upload_file(file_path=tmp_path, timeout=None)

        msg = Message(content=user_query)
        resp = assistant.chat(messages=[msg])
        result = resp["message"]["content"]

        return Response({"book":bookname,"answer": result})
