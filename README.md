# D-CODE-RED: AI-Powered News Analysis & Fact-Checking Platform

A comprehensive web application that combines multiple AI services to analyze news content, detect fake news, analyze emotions, and provide fact-checking capabilities. The platform includes a browser extension for real-time news verification.

## 🚀 Features

### Core Functionality
- **Fact-Checking**: AI-powered verification of news claims using RAG (Retrieval-Augmented Generation)
- **Sentiment Analysis**: Emotion detection in text content using DistilBERT
- **Propaganda Detection**: Identify propaganda techniques in news articles
- **Toxicity Analysis**: Detect toxic speech patterns in content
- **Voice Analysis**: Speech-to-text transcription and emotion analysis from audio
- **Image Text Extraction**: OCR capabilities to extract text from images
- **Browser Extension**: Real-time fact-checking for any webpage

### AI Services
- **RAG System**: Combines LangChain, FAISS vector store, and Ollama LLM
- **News API Integration**: Real-time news data from NewsData.io
- **Multi-Model Support**: HuggingFace transformers, Google Gemini, and custom models
- **NLP Processing**: spaCy and NLTK for text analysis

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Radix UI** - Accessible UI components
- **Lucide React** - Beautiful icons
- **React Query** - Data fetching and caching

### Backend Services
- **FastAPI** - High-performance Python web framework
- **Uvicorn** - ASGI server for FastAPI
- **Pydantic** - Data validation and settings management

### AI & ML
- **LangChain** - Framework for LLM applications
- **HuggingFace Transformers** - Pre-trained models
- **FAISS** - Vector similarity search
- **Ollama** - Local LLM inference
- **Google Gemini** - Advanced language model
- **spaCy** - Industrial-strength NLP
- **NLTK** - Natural language toolkit
- **PyTorch** - Deep learning framework

### APIs & External Services
- **NewsData.io API** - News aggregation
- **Tanbih API** - Propaganda detection
- **EasyOCR** - Optical character recognition
- **OpenAI Whisper** - Speech-to-text transcription

### Browser Extension
- **Manifest V3** - Chrome extension manifest
- **Service Workers** - Background processing
- **Content Scripts** - Page interaction

## 📁 Project Structure

```
D-CODE-RED/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   └── lib/            # Utility functions
│   ├── package.json
│   └── vite.config.js
├── backend/                 # Main fact-checking API
│   ├── app.py              # FastAPI application
│   └── requirements.txt    # Python dependencies
├── chatbot_api/            # AI chatbot service
│   ├── main.py
│   └── keys.env
├── emotion_api/            # Sentiment analysis service
│   └── main.py
├── propaganda_api/         # Propaganda detection service
│   └── main.py
├── toxic_api/              # Toxicity analysis service
│   └── main.py
├── voice_api/              # Speech analysis service
│   └── main.py
├── image_api/              # OCR service
│   └── main.py
└── extension/              # Browser extension
    ├── manifest.json
    ├── background.js
    └── content.js
```

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **Git**
- **Ollama** (for local LLM inference)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd D-CODE-RED
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:8080`

### 3. Backend Services Setup

#### Main Backend (Fact-Checking)
```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

#### Chatbot API
```bash
cd chatbot_api
pip install fastapi uvicorn python-dotenv google-generativeai requests
# Create keys.env file with your API keys
uvicorn main:app --reload --port 8001
```

#### Emotion and Voice API
```bash
cd emotion_api
pip install fastapi uvicorn transformers torch
uvicorn main:app --reload --port 8030
```

#### Propaganda API
```bash
cd propaganda_api
pip install fastapi uvicorn requests
uvicorn main:app --reload --port 8040
```

#### Toxic API
```bash
cd toxic_api
pip install fastapi uvicorn transformers torch
uvicorn main:app --reload --port 8050
```

#### Image API
```bash
cd image_api
pip install fastapi uvicorn easyocr opencv-python numpy
uvicorn main:app --reload --port 8060
```

### 4. Environment Variables

Create the following environment files:

#### `chatbot_api/keys.env`
```env
GOOGLE_API_KEY=your_google_gemini_api_key
NEWS_DATA_API=your_newsdata_api_key
```

#### `backend/.env`
```env
NEWS_DATA_API=your_newsdata_api_key
```

### 5. Install Ollama and Models
```bash
# Install Ollama (follow instructions at https://ollama.ai)
ollama pull gemma2:2b
```

### 6. Browser Extension Setup
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `extension/` folder
4. The extension will be available in your browser

## 🔧 Configuration

### API Endpoints
- **Main Backend**: `http://localhost:8000`
- **Chatbot API**: `http://localhost:8001`
- **Propaganda API**: `http://localhost:8040`
- **Toxic API**: `http://localhost:8050`
- **Voice and Emotion API**: `http://localhost:8030`
- **Image API**: `http://localhost:8060`

### Frontend Configuration
Update API endpoints in `frontend/src/components/` files to match your backend URLs.

## 📖 Usage

### Web Application
1. Start all backend services
2. Start the frontend application
3. Navigate to `http://localhost:8080`
4. Use the various analysis tools:
   - **Fact-Check**: Paste news text or URL for verification
   - **Sentiment Analysis**: Analyze emotions in text
   - **Propaganda Detection**: Identify propaganda techniques
   - **Toxicity Analysis**: Detect toxic content
   - **Voice Analysis**: Upload audio for transcription and emotion analysis
   - **Image Analysis**: Upload images for text extraction

### Browser Extension
1. Install the extension
2. Right-click on any webpage
3. Select "Check News" from the context menu
4. View fact-checking results

### API Usage

#### Fact-Checking
```bash
curl -X POST "http://localhost:8000/factcheck" \
  -H "Content-Type: application/json" \
  -d '{"text": "Your news claim here"}'
```

#### Sentiment Analysis
```bash
curl -X POST "http://localhost:8030/predict" \
  -H "Content-Type: application/json" \
  -d '{"text": "Your text here"}'
```

#### Propaganda Detection
```bash
curl -X POST "http://localhost:8040/detect_propaganda" \
  -H "Content-Type: application/json" \
  -d '{"data": "Your text here"}'
```

## 🔒 Security Considerations

- Replace `allow_origins=["*"]` with specific domains in production
- Store API keys securely using environment variables
- Implement proper authentication and rate limiting
- Use HTTPS in production environments

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the dist/ folder to your hosting service
```

### Backend Deployment
- Use Gunicorn or similar WSGI server for production
- Set up reverse proxy (Nginx/Apache)
- Configure environment variables
- Use Docker for containerized deployment

### Docker Deployment (Optional)
Create `docker-compose.yml` for easy deployment of all services.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation at `/docs` endpoints
- Review the code comments for implementation details

## 🔮 Future Enhancements

- [ ] User authentication and profiles
- [ ] Historical fact-checking database
- [ ] Mobile application
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Real-time news alerts
- [ ] Social media integration
- [ ] Advanced ML model fine-tuning

---

**Note**: This is a development version. For production use, ensure proper security measures, error handling, and performance optimization are implemented.
