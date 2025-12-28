from rest_framework import serializers
from langchain_community.document_loaders import PyPDFLoader
from .models import PDFModel, Communication
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.chat_models import init_chat_model
import requests
import tempfile
from dotenv import load_dotenv
import os
import re

load_dotenv()
os.environ['GROQ_API_KEY'] = os.getenv("GROQ_API_KEY")

class PDFModelSerializers(serializers.ModelSerializer):
    class Meta:
        model = PDFModel
        fields = "__all__"
        extra_kwargs = {
            "Title": {"required": True},
            "URL": {"required": True},
            "Plain_contents": {"read_only": True},
            "Embedded_contents": {"read_only": True},
        }

    def create(self, validated_data):
        title = validated_data["Title"]
        url = validated_data["URL"]

        response = requests.get(url)
        response.raise_for_status()

        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
        temp_file.write(response.content)
        temp_file.close()

        embedding = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

        pdf_text = ""
        data = []

        try:
            loader = PyPDFLoader(temp_file.name)
            docs = loader.load()  # Makes every page of the pdf as a single document
            for page in docs:
                # Holds the texts of each pages inside a page_content
                page_content = page.page_content

                # Split page into sentences using regex (handles '.', '?', '!', and newlines)
                sentences = [
                    s.strip() for s in re.split(r"[.?!\n,]", page_content) if s.strip()
                ]

            pdf_text = "\n".join([doc.page_content for doc in docs])

            flat_data = [sentence for page in data for sentence in page]
            embedded_pdf = embedding.embed_documents(flat_data)

        finally:
            os.remove(temp_file.name)

        pdf_detail = PDFModel.objects.create(
            Title=title,
            URL=url,
            Plain_contents=pdf_text,
            Embedded_contents=embedded_pdf,
        )

        return pdf_detail


class CommunicationSerializers(serializers.ModelSerializer):
    class Meta:
        model = Communication
        fields = "__all__"
        extra_kwargs = {
            "User_query": {"required": True},
            "AI_response": {"read_only": True},
        }

    def create(self, validated_data):
        user = validated_data["User_query"]

        response = init_chat_model(
            model="llama-3.1-8b-instant", 
            model_provider="groq"
        )
        
        ai = response.invoke(user)
        
        chats = Communication.objects.create(
            User_query = user,
            AI_response = ai.content
        )
        
        return chats
