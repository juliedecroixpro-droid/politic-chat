FROM python:3.12-slim

WORKDIR /app

# Copy backend files
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

# Create necessary directories
RUN mkdir -p ./vectors ./chroma_db

EXPOSE 8000

# Railway uses $PORT environment variable
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
