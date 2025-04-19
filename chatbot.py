from langchain.text_splitter import CharacterTextSplitter       #for splitting long texts in small chunks
from langchain_community.document_loaders import TextLoader          #this is a wrapper that lets you to generate vector embeddings
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma                 #vector database
import os

data_path="data\dynamic_pricing.txt"
chroma_db_path="vector_store"

def create_vector():
    loader=TextLoader(data_path)                        #laoding the files
    documents=loader.load()

    splitter=CharacterTextSplitter(chunk_size=500,chunk_overlap=50)          #splitting characetrs/text to chunks
    docs=splitter.split_documents(documents)

    embeddings=HuggingFaceEmbeddings()                      #converting into embeddings
    db = Chroma.from_documents(docs,embeddings,persist_directory=chroma_db_path)
    db.persist()
    print("Vector store is created successfully")

if __name__ == "__main__":
    create_vector()
