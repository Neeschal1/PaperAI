from langchain_community.document_loaders import PyPDFLoader
import requests, tempfile, re
from rest_framework.exceptions import ValidationError

def get_book_url(validated_data):
    clean_book = [] # Necessary for cosine similarity!
    clean_pdf = ''
    book_url = validated_data['URL']
    
    # Fetching book content through URL
    try:
        response = requests.get(book_url, timeout=15)
        response.raise_for_status()
    except Exception as e:
        raise ValidationError(f'URL must be a pdf!, {str(e)}')
    
    # Making sure the book name's suffix have .pdf in it.
    temporary_file = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf')
    temporary_file.write(response.content)
    temporary_file.close()
    
    # Storing book content inside a variable
    loader = PyPDFLoader(temporary_file.name)
    docs = loader.load()
    for doc in docs:
        clean_pdf = clean_pdf + doc.page_content + '\n'
        clean_book.append(clean_pdf)
        
    # Splitting book contents
    # stripped_book = re.split(r'[,.\n?!]', clean_pdf)
    # for strp in stripped_book:
    #     cleaned = strp.strip()
    #     if cleaned:
    #         clean_book.append(cleaned)
    
    return clean_book
