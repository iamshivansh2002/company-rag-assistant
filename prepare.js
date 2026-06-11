import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { OllamaEmbeddings } from "@langchain/ollama";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { v4 as uuidv4 } from "uuid";

// Convert text into vectors using local Ollama embedding model
const embeddings = new OllamaEmbeddings({
  model: "all-minilm",        // Lightweight embedding model running locally
  baseUrl: "http://localhost:11434", // Ollama default port
});

// Connect to Pinecone vector database using API key from .env
const pc = new PineconeClient({ apiKey: process.env.PINECONE_API_KEY });
const pineconeIndex = pc.Index(process.env.PINECONE_INDEX_NAME); // Target index where vectors are stored

// Load existing Pinecone index as a vector store (used for similarity search)
export const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex,
  maxConcurrency: 5, // Max parallel requests to Pinecone
});

// Index a PDF file — loads, splits into chunks, and stores in Pinecone
export async function indexTheDocument(filePath) {
  // Load full PDF as a single document (splitPages: false keeps it together)
  const loader = new PDFLoader(filePath, { splitPages: false });
  const doc = await loader.load();

  // Split large text into smaller overlapping chunks for better search accuracy
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,    // Each chunk is max 500 characters
    chunkOverlap: 100, // 100 char overlap so context isn't lost between chunks
  });
  const texts = await textSplitter.splitText(doc[0].pageContent);

  // Wrap each chunk in LangChain document format required by Pinecone
  const documents = texts.map((chunk) => ({
    pageContent: chunk,
    metadata: { text: chunk },
  }));

  // Embed and store all chunks in Pinecone
  await vectorStore.addDocuments(documents);
  console.log(`✅ Indexed ${texts.length} chunks successfully.`);
}