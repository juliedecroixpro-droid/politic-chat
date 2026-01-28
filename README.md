# 🗳️ PoliticChat

A complete web application for political candidates to create AI chatbots based on their campaign programs.

## 🎯 Features

- **Multi-Candidate Platform**: Each candidate gets their own isolated space
- **Document Processing**: Upload PDF/Word campaign programs (up to 100 pages)
- **RAG-based Q&A**: AI answers questions using only the campaign program
- **Configurable AI Personality**: Customize tone (formal/accessible) and response length
- **Public Chat Interface**: Shareable link for citizens to ask questions
- **Analytics Dashboard**: Track conversations, popular questions, and usage patterns
- **Rate Limiting**: 20 messages/day per IP to prevent abuse
- **Cost Monitoring**: Track daily API costs with budget alerts
- **GDPR Compliant**: No PII storage, anonymized conversation logging
- **Mobile Responsive**: Works seamlessly on all devices

## 🏗️ Architecture

### Backend (Python FastAPI)
- **Framework**: FastAPI + Uvicorn
- **Database**: SQLite (candidate data, conversations, costs)
- **Vector DB**: ChromaDB (local, no cloud dependency)
- **LLM**: Claude 3 Haiku (primary) + GPT-3.5 Turbo (fallback)
- **Embeddings**: OpenAI text-embedding-3-small
- **Auth**: JWT tokens

### Frontend - Admin Portal (React + Vite)
- Candidate registration/login
- Program upload with drag & drop
- AI agent configuration
- Analytics dashboard with charts
- Conversation logs
- CSV export

### Frontend - Public Chat (React + Vite)
- Clean, accessible chat interface
- Real-time message count
- Mobile-friendly
- Rate limit feedback
- No authentication required

## 📋 Prerequisites

- **Python 3.8+**
- **Node.js 18+**
- **API Keys**:
  - Anthropic API key (for Claude)
  - OpenAI API key (for embeddings and fallback)

## 🚀 Quick Start

### 1. Clone and Navigate

```bash
cd politic-chat
```

### 2. Configure API Keys

```bash
cp .env.example backend/.env
```

Edit `backend/.env` and add your API keys:
```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
SECRET_KEY=change-this-to-a-random-secret-key-in-production
```

### 3. Install Dependencies

```bash
chmod +x install.sh
./install.sh
```

This will:
- Create Python virtual environment
- Install backend dependencies
- Install frontend dependencies

### 4. Start All Services

```bash
chmod +x start.sh
./start.sh
```

This starts:
- **Backend API**: http://localhost:8000
- **Admin Portal**: http://localhost:5173
- **Public Chat**: http://localhost:5174

### 5. Create Your First Candidate

1. Open http://localhost:5173
2. Click "Register"
3. Fill in your details (name, email, password, election)
4. Upload your campaign program (PDF or Word)
5. Configure your AI agent personality
6. Share your chat link with citizens!

## 📱 Usage

### For Candidates

1. **Register/Login** at http://localhost:5173
2. **Upload Program**: Drag & drop your campaign PDF/Word document
3. **Configure Agent**: Set tone (formal/accessible) and response length
4. **Get Chat Link**: Copy your unique chat URL to share
5. **Monitor Analytics**: View conversations, top questions, costs
6. **Export Data**: Download conversations as CSV

### For Citizens

1. Visit the candidate's chat URL (e.g., http://localhost:5174/chat/jean-dupont)
2. Ask questions about the campaign program
3. Get instant AI-powered answers with source citations
4. Limit: 20 questions per day per device

## 🧪 Testing

See [TESTING_GUIDE.md](TESTING_GUIDE.md) for detailed testing instructions.

Quick test:
```bash
# Register a test candidate
# Upload sample_program.pdf
# Ask questions in the public chat
```

## 📊 API Documentation

FastAPI automatic docs available at:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔒 Security Features

- **Password Hashing**: bcrypt for secure password storage
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: 20 messages/day per IP
- **Input Sanitization**: Prevents injection attacks
- **CORS Protection**: Configured allowed origins
- **IP Hashing**: Privacy-preserving rate limiting
- **No PII Storage**: Conversations are anonymized

## 💰 Cost Estimates

Based on Anthropic/OpenAI pricing (early 2024):

**Per Candidate Setup:**
- Document upload (100 pages): ~$0.05-0.10
- Embeddings creation: ~$0.01-0.02

**Per Conversation:**
- Claude Haiku: ~$0.001-0.003 per Q&A
- Cached responses: $0 (instant)

**Daily Cost (1000 conversations):**
- Without caching: ~$2-3/day
- With caching (50% hit rate): ~$1-1.50/day

Budget alert set at $10/day by default.

## 📁 Project Structure

```
politic-chat/
├── backend/
│   ├── main.py              # FastAPI app
│   ├── config.py            # Settings
│   ├── database.py          # SQLAlchemy models
│   ├── auth.py              # JWT authentication
│   ├── document_processor.py # PDF/Word parsing + ChromaDB
│   ├── llm.py               # Claude/GPT integration
│   ├── rate_limiter.py      # Rate limiting logic
│   └── requirements.txt     # Python dependencies
├── frontend-admin/          # Candidate portal (React)
│   ├── src/
│   │   ├── pages/           # Login, Register, Dashboard
│   │   ├── components/      # ProgramUpload, AgentConfig, Analytics
│   │   └── utils/           # API client, auth helpers
│   └── package.json
├── frontend-public/         # Citizen chat interface (React)
│   ├── src/
│   │   └── pages/           # Chat page
│   └── package.json
├── .env.example             # Environment variables template
├── install.sh               # One-click setup
├── start.sh                 # Launch all services
├── stop.sh                  # Stop all services
└── README.md                # This file
```

## 🛠️ Troubleshooting

### Backend won't start
- Check `backend.log` for errors
- Verify API keys in `backend/.env`
- Ensure port 8000 is not in use

### Frontend won't start
- Check `admin.log` or `public.log`
- Run `npm install` in frontend directories
- Ensure ports 5173 and 5174 are free

### Document processing fails
- Max file size: 50MB
- Max pages: 100
- Supported formats: PDF, DOCX, DOC
- Check file isn't password-protected

### Rate limiting issues
- Default: 20 messages/day per IP
- Change in `backend/.env`: `RATE_LIMIT_PER_DAY=50`
- Restart backend after changes

## 🔧 Configuration

Edit `backend/.env` to customize:

```env
# Rate limiting
RATE_LIMIT_PER_DAY=20           # Messages per IP per day

# Cost monitoring
DAILY_BUDGET_ALERT_USD=10.0     # Alert threshold

# Document limits
MAX_PAGES=100                   # Max pages in document
MAX_FILE_SIZE_MB=50             # Max upload size

# LLM models
PRIMARY_MODEL=claude-3-haiku-20240307
FALLBACK_MODEL=gpt-3.5-turbo
EMBEDDING_MODEL=text-embedding-3-small
```

## 🚀 Production Deployment

### Security Checklist

1. **Change SECRET_KEY** in `.env` to a random 64-character string
2. **Use HTTPS** for all traffic
3. **Configure CORS_ORIGINS** with your actual domains
4. **Use PostgreSQL** instead of SQLite for production
5. **Enable backup** for databases and uploaded files
6. **Set up monitoring** for costs and errors
7. **Use environment variables** for all secrets
8. **Enable rate limiting** at reverse proxy level too

### Deployment Options

**Option 1: VPS (DigitalOcean, Linode, etc.)**
```bash
# Use nginx as reverse proxy
# Configure SSL with Let's Encrypt
# Use systemd for process management
# Set up database backups
```

**Option 2: Cloud Platform (Heroku, Railway, etc.)**
```bash
# Use their PostgreSQL addon
# Configure environment variables
# Use their SSL certificates
# Enable automatic backups
```

**Option 3: Docker**
```bash
# Create Dockerfile for backend
# Create docker-compose.yml
# Use nginx for serving frontends
# Mount volumes for persistence
```

## 📝 License

This project is provided as-is for educational and campaign use.

## 🤝 Support

For issues or questions, check:
- API documentation: http://localhost:8000/docs
- Testing guide: TESTING_GUIDE.md
- Backend logs: `backend.log`

## 🎯 Roadmap

Future enhancements:
- [ ] Multi-language support
- [ ] Voice chat integration
- [ ] Advanced analytics (sentiment analysis)
- [ ] Email notifications for candidates
- [ ] WhatsApp integration
- [ ] Custom branding per candidate
- [ ] Team collaboration features
- [ ] A/B testing for agent personalities

---

**Built with ❤️ for transparent political communication**
