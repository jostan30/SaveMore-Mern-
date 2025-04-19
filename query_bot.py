from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.chat_models import ChatOllama

chroma_db_path = "vector_store"

def get_bot():
    embeddings = HuggingFaceEmbeddings()
    vectordb = Chroma(persist_directory=chroma_db_path, embedding_function=embeddings)

    retriever = vectordb.as_retriever(search_kwargs={"k": 3})
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

    llm = ChatOllama(model="mistral")

    qa = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=retriever,
        memory=memory
    )
    return qa

chatbot = get_bot()

def get_bot_response(user_query):
    return chatbot.run(user_query)
