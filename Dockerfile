FROM python:3.12-slim

WORKDIR /app

# Copy backend files
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

# Create necessary directories
RUN mkdir -p ./vectors ./chroma_db ./uploads

EXPOSE 8080

# Start uvicorn - Railway will override port via $PORT env var
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}"]
