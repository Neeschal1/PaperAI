from ..models import Communication, PDFModel
from langchain.chat_models import init_chat_model
import os
from dotenv import load_dotenv
from sklearn.metrics.pairwise import cosine_similarity

load_dotenv()
os.environ['GROQ_API_KEY'] = os.getenv('GROQ_API_KEY')

system_prompt = '''
You are a document-grounded AI assistant.

You MUST answer user queries ONLY using the provided PDF text.
You are forbidden from using any external knowledge.

If the answer is missing, incomplete, or ambiguous in the document, you MUST say:
"I cannot answer this based on the uploaded document."

Never guess.
Never infer beyond the text.
Never add explanations not supported by the document.

Your goal is factual accuracy over completeness.
'''



def chat(user, embeddings):
    response = init_chat_model(
        model="llama-3.1-8b-instant",
        model_provider='groq'
    )
    
    stored_embeddings = []
    stored_embeddings.append(PDFModel.Embedded_contents)
    result = cosine_similarity([embeddings], stored_embeddings)

    ai = response.invoke(f'{system_prompt}. The user query is: {result}')
    
    ai_response = Communication.objects.create(
        User_query = user,
        AI_response = ai
    )
    
    return ai_response
