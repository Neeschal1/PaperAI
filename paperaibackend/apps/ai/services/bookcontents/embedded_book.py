from langchain_huggingface import HuggingFaceEmbeddings

# Embedding the whole book contents
embed = HuggingFaceEmbeddings(model_name = "sentence-transformers/all-MiniLM-L6-v2")

def full_embedded_book(book_content):
    clean_book = embed.embed_documents(book_content)
    
    return clean_book