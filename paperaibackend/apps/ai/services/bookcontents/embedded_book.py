from langchain_huggingface import HuggingFaceEmbeddings

# Embedding the whole book contents
embed = HuggingFaceEmbeddings(model_name = "sentence-transformers/all-MiniLM-L6-v2")

def full_embedded_book(clean_book):
    embedded_book = embed.embed_documents(clean_book)
    
    return embedded_book