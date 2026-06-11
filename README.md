# 🚀 Company RAG Assistant

A Retrieval-Augmented Generation (RAG) application that enables employees to ask company policy and HR-related questions in natural language and receive accurate, context-aware responses.

The system processes PDF documents, converts them into vector embeddings, stores them in Pinecone Vector Database, retrieves relevant information using semantic search, and generates responses with a Large Language Model (LLM).

## 🎥 Application Demo

![Demo](./company-rag-assitant.gif)

## 🏗️ RAG Pipeline Architecture

![RAG Workflow](./rag_chatbot_flow.svg)

---

## 📖 Overview

Company RAG Assistant is an AI-powered knowledge assistant designed to answer company policy questions using Retrieval-Augmented Generation (RAG).

Instead of relying solely on an LLM's training data, the application retrieves relevant information from company documents and uses that context to generate accurate and reliable responses.

---

## ✨ Features

### 📄 Document Processing

* Upload and process PDF documents
* PDF parsing using LangChain PDF Loader
* Intelligent text chunking
* Context-preserving chunk overlap

### 🧠 Retrieval-Augmented Generation

* Semantic document retrieval
* Similarity search using vector embeddings
* Context-aware answer generation
* Retrieval of relevant document chunks

### 🔍 Vector Search

* Ollama Embeddings (`all-minilm`)
* Pinecone Vector Database
* Cosine similarity search
* Fast document retrieval

### 🤖 AI Assistant

* Groq LLM integration
* Natural language question answering
* Company policy assistance
* HR knowledge base chatbot

### 💬 User Interface

* React-based chat interface
* Real-time conversation experience
* Suggested policy questions
* Markdown response rendering

---

## 📂 Project Structure

```bash
company-rag-assistant
│
├── frontend/
│
├── chat.js
├── rag.js
├── prepare.js
├── server.js
├── package.json
├── README.md
└── .env
```

---

## ⚙️ Tech Stack

### Frontend

* React
* JavaScript
* React Markdown

### Backend

* Node.js
* Express.js

### AI & RAG

* LangChain
* Groq LLM
* Ollama Embeddings
* Pinecone Vector Database

### Document Processing

* PDF Loader
* Recursive Character Text Splitter

---

## 🔄 System Architecture

```text
PDF Document
      │
      ▼
PDF Loader
      │
      ▼
Text Chunking
      │
      ▼
Ollama Embeddings
      │
      ▼
Pinecone Vector Database
      │
      ▼
Similarity Search
      │
      ▼
Relevant Chunks
      │
      ▼
Groq LLM
      │
      ▼
Final Response
```

---

## 📌 Example Questions

* How many sick leaves do employees receive?
* What is the notice period?
* How does the promotion policy work?
* What is the annual learning budget?
* Can employees work remotely?
* What is the health insurance coverage?

---

## 🔑 Environment Variables

```env
PINECONE_API_KEY=
PINECONE_INDEX_NAME=
GROQ_API_KEY=
```

---

## 🚀 Installation

```bash
git clone https://github.com/iamshivansh2002/company-rag-assistant.git

cd company-rag-assistant

bun install
```

---

## 📥 Index Documents

```bash
bun prepare.js
```

---

## 🖥️ Run Backend

```bash
bun server.js
```

Backend runs on:

```text
http://localhost:3000
```

---

## 🌐 Run Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🎯 Key Concepts Demonstrated

* Retrieval-Augmented Generation (RAG)
* Vector Embeddings
* Semantic Search
* Similarity Search
* Vector Databases
* Document Processing
* Context-Aware Question Answering
* LLM Integration

---

## 📄 License

This project is intended for learning, experimentation, and portfolio demonstration purposes.
