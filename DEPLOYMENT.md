# Windsurf MVP Deployment Plan

## Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel        │    │  Render/Railway │    │   Supabase      │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
│                 │    │                 │    │                 │
│ • Next.js App   │    │ • FastAPI       │    │ • PostgreSQL    │
│ • Static Assets │    │ • PDF Generator │    │ • Auth          │
│ • Edge Network  │    │ • AI Services   │    │ • File Storage  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Environment Setup

### 1. Supabase Setup
```bash
# 1. Create new Supabase project at https://supabase.com
# 2. Run the schema.sql in SQL Editor
# 3. Configure authentication providers
# 4. Get project credentials
```

**Required Supabase Configuration:**
- **Authentication**: Email/Password + Google OAuth
- **Database**: Run `schema.sql` from `/database/schema.sql`
- **Storage**: Create bucket for profile images (optional)
- **API**: Enable RLS policies

### 2. Frontend Deployment (Vercel)

#### Vercel Configuration
```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase_url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase_anon_key",
    "NEXT_PUBLIC_API_URL": "@api_url"
  }
}
```

#### Environment Variables (Vercel)
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Backend API
NEXT_PUBLIC_API_URL=https://windsurf-api.render.com

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

#### Deployment Steps
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login and deploy
cd frontend
vercel login
vercel --prod

# 3. Configure custom domain (optional)
vercel domains add windsurf.app
```

### 3. Backend Deployment (Render)

#### Render Configuration
```yaml
# render.yaml
services:
  - type: web
    name: windsurf-api
    env: python
    buildCommand: "pip install -r requirements.txt"
    startCommand: "uvicorn app.main:app --host 0.0.0.0 --port $PORT"
    envVars:
      - key: PYTHON_VERSION
        value: 3.11.0
      - key: SUPABASE_URL
        sync: false
      - key: SUPABASE_SERVICE_KEY
        sync: false
      - key: OPENAI_API_KEY
        sync: false
```

#### Environment Variables (Render)
```bash
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key

# OpenAI (optional)
OPENAI_API_KEY=sk-...

# App Configuration
ENVIRONMENT=production
CORS_ORIGINS=https://windsurf.app,https://windsurf.vercel.app
SECRET_KEY=your-secret-key-here

# PDF Generation
WKHTMLTOPDF_PATH=/usr/local/bin/wkhtmltopdf
```

#### Dockerfile (Alternative: Railway)
```dockerfile
# Dockerfile
FROM python:3.11-slim

# Install system dependencies for PDF generation
RUN apt-get update && apt-get install -y \
    wkhtmltopdf \
    xvfb \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Start command
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 4. Domain & DNS Configuration

#### Custom Domain Setup
```bash
# Frontend (Vercel)
windsurf.app → Vercel

# Backend (Render)
api.windsurf.app → Render

# Database
# Supabase provides: your-project.supabase.co
```

#### DNS Records
```
Type    Name    Value                           TTL
A       @       76.76.19.61 (Vercel)          300
CNAME   api     windsurf-api.onrender.com      300
CNAME   www     windsurf.vercel.app            300
```

## CI/CD Pipeline

### GitHub Actions (Frontend)
```yaml
# .github/workflows/frontend.yml
name: Deploy Frontend

on:
  push:
    branches: [main]
    paths: ['frontend/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
          
      - name: Build
        run: |
          cd frontend
          npm run build
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend
```

### GitHub Actions (Backend)
```yaml
# .github/workflows/backend.yml
name: Deploy Backend

on:
  push:
    branches: [main]
    paths: ['backend/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Render
        uses: johnbeynon/render-deploy-action@v0.0.8
        with:
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}
```

## Monitoring & Analytics

### Application Monitoring
```python
# backend/app/middleware/monitoring.py
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration

sentry_sdk.init(
    dsn="your-sentry-dsn",
    integrations=[FastApiIntegration()],
    traces_sample_rate=0.1,
)
```

### Performance Monitoring
- **Frontend**: Vercel Analytics + Web Vitals
- **Backend**: Render metrics + Sentry
- **Database**: Supabase built-in monitoring

### Error Tracking
- **Sentry**: Application errors and performance
- **Vercel**: Frontend errors and edge function logs
- **Render**: Backend logs and health checks

## Security Configuration

### CORS Setup
```python
# backend/app/main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://windsurf.app",
        "https://windsurf.vercel.app",
        "http://localhost:3000"  # Development only
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
```

### Rate Limiting
```python
# backend/app/middleware/rate_limit.py
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Usage in routes
@app.post("/api/v1/analyze")
@limiter.limit("10/minute")
async def analyze_engagement(request: Request, ...):
    pass
```

## Backup & Recovery

### Database Backups
- **Supabase**: Automatic daily backups (Pro plan)
- **Manual**: Export via Supabase dashboard or CLI

### File Storage
- **Profile Images**: Supabase Storage (with CDN)
- **Generated PDFs**: Temporary (regenerate on demand)

## Scaling Considerations

### Frontend Scaling
- **Vercel**: Automatic edge caching and CDN
- **Static Generation**: Pre-build landing pages
- **Image Optimization**: Next.js Image component

### Backend Scaling
- **Render**: Auto-scaling based on CPU/memory
- **Caching**: Redis for frequent queries (future)
- **Queue**: Background jobs for PDF generation (future)

### Database Scaling
- **Supabase**: Connection pooling and read replicas
- **Indexing**: Optimize queries with proper indexes
- **Archiving**: Move old data to cold storage

## Cost Estimation (Monthly)

### Development/MVP
- **Vercel**: $0 (Hobby plan)
- **Render**: $7 (Starter plan)
- **Supabase**: $0 (Free tier: 50MB, 2 projects)
- **Total**: ~$7/month

### Production (1K users)
- **Vercel**: $20 (Pro plan)
- **Render**: $25 (Standard plan)
- **Supabase**: $25 (Pro plan: 8GB, unlimited projects)
- **Sentry**: $26 (Team plan)
- **Total**: ~$96/month

### Growth (10K users)
- **Vercel**: $20 (Pro plan)
- **Render**: $85 (Pro plan with scaling)
- **Supabase**: $25-60 (based on usage)
- **CDN**: $10 (for PDF delivery)
- **Total**: ~$140-175/month

## Launch Checklist

### Pre-Launch
- [ ] Database schema deployed to Supabase
- [ ] Backend deployed to Render with health checks
- [ ] Frontend deployed to Vercel with custom domain
- [ ] Environment variables configured
- [ ] CORS and security headers configured
- [ ] Error tracking and monitoring setup
- [ ] Basic load testing completed

### Launch Day
- [ ] DNS propagation verified
- [ ] SSL certificates active
- [ ] All integrations tested end-to-end
- [ ] Analytics tracking confirmed
- [ ] Backup procedures verified
- [ ] Support documentation ready

### Post-Launch
- [ ] Monitor error rates and performance
- [ ] Track user engagement and conversion
- [ ] Collect user feedback
- [ ] Plan feature iterations
- [ ] Scale infrastructure as needed
