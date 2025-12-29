from langchain_huggingface import HuggingFaceEmbeddings

def full_embedded_book(clean_book):
    # Embedding the whole book contents
    embed = HuggingFaceEmbeddings(model_name = "sentence-transformers/all-MiniLM-L6-v2")
    embedded_book = embed.embed_query(clean_book)
    
    return embedded_book