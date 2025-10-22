# Windsurf MVP - Folder Structure

```
windsurf/
├── frontend/                    # Next.js 14 App Router
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Landing page
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── media-kit/
│   │   │   └── [username]/
│   │   │       └── page.tsx    # Public media kit
│   │   └── settings/
│   │       └── page.tsx
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── dashboard/
│   │   │   ├── AnalyzerForm.tsx
│   │   │   └── ResultsPreview.tsx
│   │   ├── media-kit/
│   │   │   └── MediaKitDisplay.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client
│   │   ├── api.ts              # API calls to backend
│   │   └── utils.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useMediaKit.ts
│   ├── types/
│   │   └── index.ts
│   ├── public/
│   ├── .env.local
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   ├── components.json         # shadcn/ui config
│   └── next.config.js
│
├── backend/                     # FastAPI Python
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py             # FastAPI app entry
│   │   ├── config.py           # Environment config
│   │   ├── database.py         # Supabase connection
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   └── media_kit.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py
│   │   │   ├── analyzer.py
│   │   │   └── media_kit.py
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── engagement.py   # Engagement calculations
│   │   │   ├── pdf_generator.py
│   │   │   └── ai_service.py   # OpenAI integration
│   │   └── utils/
│   │       ├── __init__.py
│   │       └── helpers.py
│   ├── templates/
│   │   └── media_kit.html      # PDF template
│   ├── requirements.txt
│   ├── .env
│   ├── .env.example
│   ├── Dockerfile              # For deployment
│   └── README.md
│
├── database/
│   ├── schema.sql              # Supabase schema
│   └── migrations/
│
├── docs/
│   ├── API.md                  # API documentation
│   └── DEPLOYMENT.md
│
├── .gitignore
├── README.md
└── docker-compose.yml          # Local development
```

## Key Design Decisions

### Frontend (Next.js 14)
- **App Router**: Modern routing with server components
- **shadcn/ui**: Pre-built, customizable components
- **Tailwind CSS**: Utility-first styling
- **TypeScript**: Type safety throughout
- **SWR**: Data fetching and caching

### Backend (FastAPI)
- **Modular structure**: Separate routes, services, models
- **Pydantic models**: Request/response validation
- **WeasyPrint**: HTML-to-PDF generation
- **Supabase client**: Database operations
- **OpenAI integration**: AI-powered content generation

### Database (Supabase)
- **Built-in auth**: User management
- **PostgreSQL**: Relational data storage
- **Row Level Security**: Data protection
- **Real-time subscriptions**: Future features

### Deployment
- **Frontend**: Vercel (seamless Next.js deployment)
- **Backend**: Render/Railway (Python hosting)
- **Database**: Supabase (managed PostgreSQL)
- **CDN**: Vercel Edge Network
