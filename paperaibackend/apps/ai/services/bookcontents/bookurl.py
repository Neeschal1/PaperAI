from langchain_community.document_loaders import PyPDFLoader
from langchain_huggingface import HuggingFaceEmbeddings
import requests, tempfile, re
from rest_framework.exceptions import ValidationError

def get_book_url(validated_data):
    # clean_book = [] # Necessary for cosine similarity!
    book_url = validated_data['URL']
    
    # Fetching book content through URL
    response = requests.get(book_url)
    response.raise_for_status()
    
    # Making sure the book name's suffix have .pdf in it.
    temporary_file = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
    temporary_file.write(response.content)
    temporary_file.close()
    
    # Storing book content inside a variable
    try:
        loader = PyPDFLoader(temporary_file.name)
        docs = loader.load()
        
        # Splitting book contents
        stripped_book = re.split(r'[,.\n?!]', docs)
        for strp in stripped_book:
            # clean_book.append(strp.strip())
            clean_book = strp.strip()
        
    except:
        raise ValidationError('Some error occured during the process. Please try again later!!!')
    
    return clean_book