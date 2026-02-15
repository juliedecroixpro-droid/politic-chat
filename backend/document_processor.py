import os
import json
import pickle
import hashlib
from typing import List, Tuple
from PyPDF2 import PdfReader
from docx import Document as DocxDocument
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from config import settings

# Lazy load embedding model
embedding_model = None

def get_embedding_model():
    """Load embedding model on first use."""
    global embedding_model
    if embedding_model is None:
        print("Loading embedding model...")
        embedding_model = SentenceTransformer('distiluse-base-multilingual-cased-v1')
        print("Embedding model loaded!")
    return embedding_model

VECTORS_DIR = "./vectors"
os.makedirs(VECTORS_DIR, exist_ok=True)

def extract_text_from_pdf(file_path: str, max_pages: int = 100) -> List[Tuple[int, str]]:
    """Extract text from PDF, returning list of (page_num, text) tuples."""
    reader = PdfReader(file_path)
    pages = []
    
    for i, page in enumerate(reader.pages[:max_pages]):
        text = page.extract_text()
        if text.strip():
            pages.append((i + 1, text))
    
    return pages

def extract_text_from_docx(file_path: str) -> List[Tuple[int, str]]:
    """Extract text from DOCX, chunking by paragraphs and grouping into 'pages'."""
    doc = DocxDocument(file_path)
    chunks = []
    current_chunk = []
    chunk_num = 1
    words_in_chunk = 0
    
    for para in doc.paragraphs:
        text = para.text.strip()
        if text:
            current_chunk.append(text)
            words_in_chunk += len(text.split())
            
            # Create a "page" every ~500 words
            if words_in_chunk >= 500:
                chunks.append((chunk_num, "\n".join(current_chunk)))
                current_chunk = []
                words_in_chunk = 0
                chunk_num += 1
    
    # Add remaining text
    if current_chunk:
        chunks.append((chunk_num, "\n".join(current_chunk)))
    
    return chunks

def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200) -> List[str]:
    """Split text into overlapping chunks."""
    words = text.split()
    chunks = []
    
    for i in range(0, len(words), chunk_size - overlap):
        chunk = " ".join(words[i:i + chunk_size])
        if chunk.strip():
            chunks.append(chunk)
    
    return chunks

def create_embeddings(texts: List[str]) -> np.ndarray:
    """Create embeddings using sentence-transformers."""
    model = get_embedding_model()
    return model.encode(texts, show_progress_bar=False)

def process_document(file_path: str, candidate_id: int, filename: str, doc_type: str = "program") -> dict:
    """Process document and store embeddings locally."""
    # Determine file type and extract text
    ext = os.path.splitext(filename)[1].lower()
    
    if ext == '.pdf':
        pages = extract_text_from_pdf(file_path, settings.MAX_PAGES)
    elif ext in ['.docx', '.doc']:
        pages = extract_text_from_docx(file_path)
    else:
        raise ValueError(f"Unsupported file type: {ext}")
    
    if not pages:
        raise ValueError("No text could be extracted from the document")
    
    # Create chunks with metadata
    all_chunks = []
    all_metadata = []
    
    for page_num, page_text in pages:
        chunks = chunk_text(page_text)
        for chunk_idx, chunk in enumerate(chunks):
            all_chunks.append(chunk)
            all_metadata.append({
                "page": page_num,
                "chunk": chunk_idx,
                "source": filename
            })
    
    # Create embeddings
    embeddings = create_embeddings(all_chunks)
    
    # Store data
    candidate_data = {
        "chunks": all_chunks,
        "metadata": all_metadata,
        "embeddings": embeddings,
        "doc_type": doc_type
    }
    
    vector_file = os.path.join(VECTORS_DIR, f"candidate_{candidate_id}_{doc_type}.pkl")
    with open(vector_file, 'wb') as f:
        pickle.dump(candidate_data, f)
    
    return {
        "total_pages": len(pages),
        "total_chunks": len(all_chunks),
        "vector_file": vector_file
    }

def search_documents(candidate_id: int, query: str, n_results: int = 5, doc_types: List[str] = ["program", "talking_points", "competitive"]) -> List[dict]:
    """Search for relevant sections across all candidate documents."""
    all_results = []
    
    # Create query embedding once
    query_embedding = create_embeddings([query])[0]
    
    # Search each document type
    for doc_type in doc_types:
        vector_file = os.path.join(VECTORS_DIR, f"candidate_{candidate_id}_{doc_type}.pkl")
        
        if not os.path.exists(vector_file):
            continue
        
        # Load candidate data
        with open(vector_file, 'rb') as f:
            candidate_data = pickle.load(f)
        
        chunks = candidate_data["chunks"]
        metadata = candidate_data["metadata"]
        embeddings = candidate_data["embeddings"]
        
        # Calculate similarities
        similarities = cosine_similarity([query_embedding], embeddings)[0]
        
        # Add to all results with doc_type
        for idx, similarity in enumerate(similarities):
            all_results.append({
                "text": chunks[idx],
                "page": metadata[idx].get("page", "N/A"),
                "source": metadata[idx].get("source", "Unknown"),
                "doc_type": doc_type,
                "similarity": float(similarity)
            })
    
    # Sort all results by similarity
    all_results.sort(key=lambda x: x["similarity"], reverse=True)
    
    # Return top N results
    return all_results[:n_results]

# Alias for backward compatibility
search_program = search_documents
