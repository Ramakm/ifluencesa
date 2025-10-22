# Ifluencesa - Influencer Media Kit Generator + Engagement Analyze

**Transform your social influence into professional media kits with engagement analytics and PDF generation.**

Ifluencesa is a comprehensive SaaS platform that helps content creators analyze their engagement metrics and generate professional media kits to attract brand partnerships.

## Features

- **Engagement Analytics**: Calculate engagement rates, analyze performance, and get actionable insights
- **AI-Powered Media Kits**: Generate professional, branded media kits in seconds
- **Multi-Platform Support**: Instagram, TikTok, and YouTube integration
- **PDF Export**: Download professional PDF versions for email pitches
- **Shareable Links**: Public URLs with view tracking
- **Brand Readiness Score**: Comprehensive scoring with improvement recommendations

## Architecture

### Frontend (Next.js 14)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Authentication**: Supabase Auth
- **Data Fetching**: SWR for caching and real-time updates
- **Deployment**: Vercel

### Backend (FastAPI)
- **Framework**: FastAPI with async/await
- **Database**: Supabase (PostgreSQL)
- **PDF Generation**: WeasyPrint
- **Authentication**: JWT token verification
- **Deployment**: Render/Railway

### Database (Supabase)
- **Type**: PostgreSQL with Row Level Security
- **Features**: Real-time subscriptions, built-in auth
- **Tables**: profiles, social_accounts, engagement_analyses, media_kits

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- Supabase account
- Git

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/Ifluencesa.git
cd Ifluencesa
```

### 2. Setup Database (Supabase)

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `database/schema.sql` in the Supabase SQL Editor
3. Copy your project URL and keys

### 3. Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Edit .env with your Supabase credentials
nano .env
```

Required environment variables:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
SUPABASE_ANON_KEY=your-anon-key
SECRET_KEY=your-secret-key-here
```

### 4. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Edit .env.local with your configuration
nano .env.local
```

Required environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 5. Run Development Servers

**Backend:**
```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend:**
```bash
cd frontend
npm run dev
```

Visit:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Project Structure

```
Ifluencesa/
├── frontend/                 # Next.js 14 App
│   ├── app/                 # App Router pages
│   ├── components/          # React components
│   ├── lib/                 # Utilities and API client
│   └── types/               # TypeScript definitions
├── backend/                 # FastAPI Application
│   ├── app/
│   │   ├── models/         # Pydantic models
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic
│   │   └── utils/          # Helper functions
│   └── templates/          # PDF templates
├── database/               # Database schema and migrations
└── docs/                   # Documentation
```

## Development

### Adding New Features

1. **Frontend**: Create components in `frontend/components/`
2. **Backend**: Add routes in `backend/app/routes/`
3. **Database**: Update schema in `database/schema.sql`

### Testing

```bash
# Frontend
cd frontend
npm run test

# Backend
cd backend
pytest
```

### Code Quality

```bash
# Frontend
npm run lint
npm run type-check

# Backend
black app/
flake8 app/
mypy app/
```

## Deployment

### Production Setup

1. **Frontend (Vercel)**:
   ```bash
   npm i -g vercel
   vercel --prod
   ```

2. **Backend (Render)**:
   - Connect GitHub repository
   - Set environment variables
   - Deploy automatically on push

3. **Database (Supabase)**:
   - Already hosted and managed
   - Configure production settings

### Environment Variables

**Frontend (Vercel)**:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_API_URL`

**Backend (Render)**:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `SECRET_KEY`
- `CORS_ORIGINS`

## 📊 API Documentation

### Authentication
All protected endpoints require a Bearer token from Supabase Auth.

### Key Endpoints

- `POST /api/v1/analyze` - Analyze engagement metrics
- `POST /api/v1/media-kit` - Create media kit
- `GET /api/v1/media-kit/{username}` - Get public media kit
- `GET /api/v1/media-kit/{kit_id}/pdf` - Download PDF

Full API documentation available at `/docs` when running the backend.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder
- **Issues**: Open a GitHub issue
- **Email**: support@Ifluencesa.app

## 🎉 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [FastAPI](https://fastapi.tiangolo.com/) for the high-performance API framework
- [Supabase](https://supabase.com/) for the backend-as-a-service platform
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

**Made with ❤️ for content creators worldwide**
Influencer Media Kit Generator + Engagement Analyzer for all.
