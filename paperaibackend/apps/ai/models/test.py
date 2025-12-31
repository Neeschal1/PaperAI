from pinecone import Pinecone
from env_config import PINECONE_API_KEY

pc = Pinecone(api_key=PINECONE_API_KEY)
INDEX = 'paperai'

# if not pc.has_index(INDEX):
    
