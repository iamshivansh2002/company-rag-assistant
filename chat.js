import express from "express";
import cors from "cors";
import { vectorStore } from "./prepare.js"; // Pinecone vector store for similarity search
import Groq from "groq-sdk";

const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY }); // Groq LLM client

app.use(cors());          // Allow requests from frontend (localhost:5173)
app.use(express.json());  // Parse incoming JSON request bodies

// Main chat endpoint — receives a question, finds relevant policy context, returns AI answer
app.post("/chat", async (req, res) => {
  const { question } = req.body;

  // Step 1: Search Pinecone for the 3 most relevant chunks from the policy PDF
  const relevantChunks = await vectorStore.similaritySearch(question, 3);

    //  GUARD 
  if (relevantChunks.length === 0) {
    return res.json({ answer: "⚠️ No policy data found. Please re-index the document by running rag.js." });
  }
  // Step 2: Join chunks into a single context string to pass to the LLM
  const context = relevantChunks.map((c) => c.pageContent).join("\n\n");

  // Step 3: Send question + context to Groq LLM (RAG pattern)
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile", // Fast and capable open-source LLM via Groq
    messages: [
      {
        role: "system",
        // Restrict the LLM to only answer from the retrieved policy context
        content: `You are TechNova HR Assistant. Answer using only the policy context below. If not found say "I don't have that information."

Context:
${context}`,
      },
      { role: "user", content: question }, // The actual user question
    ],
  });

  // Step 4: Send the LLM's answer back to the frontend
  res.json({ answer: completion.choices[0].message.content });
});

app.listen(3000, () => console.log("🚀 Server running at http://localhost:3000"));