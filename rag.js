// One-time script —  only re-run this if you change or update the PDF
// WARNING: Re-running will create duplicate chunks in Pinecone
// Usage: rag.js

import { indexTheDocument } from "./prepare.js"; // Function that loads, splits and stores PDF chunks

const filePath = './companypolicy.pdf'; // Path to the HR policy PDF

// Index the document — embeds all chunks and uploads them to Pinecone
indexTheDocument(filePath);