# DeepSeek Chat Web App

A responsive web interface for DeepSeek AI chat using OpenRouter API.

## Quick Deploy Options

### 1. Railway (Recommended - Free)
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Connect your repo
5. Add environment variable: `OPENROUTER_API_KEY=your_key_here`
6. Deploy!

### 2. Render (Free)
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your repo
5. Add environment variable: `OPENROUTER_API_KEY=your_key_here`
6. Deploy!

### 3. Heroku (Free tier discontinued)
1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Run:
```bash
heroku create your-app-name
heroku config:set OPENROUTER_API_KEY=your_key_here
git push heroku main
```

### 4. Local Development
```bash
cd Deepseek
pip install -r requirements.txt
uvicorn server:app --reload
```
Then visit: http://127.0.0.1:8000/ui

## Environment Variables
- `OPENROUTER_API_KEY`: Your OpenRouter API key (required)

## Features
- Responsive design (mobile + desktop)
- Real-time chat with DeepSeek AI
- Model selection
- Clean, modern UI
