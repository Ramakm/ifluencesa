# Windsurf Setup Guide

This guide will walk you through setting up Windsurf locally for development.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** and npm
- **Python 3.11+** and pip
- **Git**
- **Supabase account** (free tier available)

## 🗄️ Database Setup (Supabase)

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `windsurf-dev` (or your preferred name)
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your location
5. Click "Create new project"

### 2. Configure Database Schema

1. Wait for project creation to complete
2. Go to the **SQL Editor** in your Supabase dashboard
3. Copy the entire contents of `database/schema.sql`
4. Paste into the SQL Editor and click **Run**
5. Verify tables were created in the **Table Editor**

### 3. Get API Keys

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL**: `https://your-project.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role secret key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

⚠️ **Keep your service_role key secure** - it has admin access to your database.

## 🐍 Backend Setup (FastAPI)

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Create Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate it
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit the file
nano .env  # or use your preferred editor
```

Fill in your Supabase credentials:

```env
# Environment Configuration
ENVIRONMENT=development

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
SUPABASE_ANON_KEY=your-anon-key

# CORS Configuration
CORS_ORIGINS=http://localhost:3000

# Security
SECRET_KEY=your-secret-key-change-in-production

# Optional: OpenAI for AI features
OPENAI_API_KEY=sk-your-openai-api-key
```

### 5. Install System Dependencies (Optional)

For PDF generation, you may need to install WeasyPrint dependencies:

**macOS:**
```bash
brew install cairo pango gdk-pixbuf libffi
```

**Ubuntu/Debian:**
```bash
sudo apt-get install build-essential python3-dev python3-pip python3-setuptools python3-wheel python3-cffi libcairo2 libpango-1.0-0 libpangocairo-1.0-0 libgdk-pixbuf2.0-0 libffi-dev shared-mime-info
```

### 6. Start Backend Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

✅ **Backend should now be running at:** http://localhost:8000

Visit http://localhost:8000/docs to see the API documentation.

## ⚛️ Frontend Setup (Next.js)

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
# Copy environment template
cp .env.example .env.local

# Edit the file
nano .env.local  # or use your preferred editor
```

Fill in your configuration:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Start Frontend Server

```bash
npm run dev
```

✅ **Frontend should now be running at:** http://localhost:3000

## 🧪 Testing the Setup

### 1. Test Backend Health

Visit: http://localhost:8000/health

You should see:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0",
  "database": "connected"
}
```

### 2. Test Frontend

1. Visit: http://localhost:3000
2. You should see the Windsurf landing page
3. Click "Get Started" to test the signup flow

### 3. Test Full Flow

1. **Sign Up**: Create a new account
2. **Dashboard**: Should redirect to dashboard after signup
3. **Analyze**: Fill out the engagement analyzer form
4. **Media Kit**: Generate a media kit from the results

## 🔧 Development Workflow

### Running Both Servers

You'll need two terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
source venv/bin/activate  # if not already activated
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### Making Changes

- **Frontend changes**: Auto-reload with Next.js dev server
- **Backend changes**: Auto-reload with uvicorn `--reload` flag
- **Database changes**: Update `database/schema.sql` and re-run in Supabase

## 🐛 Troubleshooting

### Common Issues

**1. "Module not found" errors (Backend)**
```bash
# Make sure virtual environment is activated
source venv/bin/activate
# Reinstall dependencies
pip install -r requirements.txt
```

**2. "Cannot connect to database"**
- Check your Supabase URL and keys in `.env`
- Verify your Supabase project is running
- Check network connectivity

**3. "CORS errors" (Frontend)**
- Ensure `CORS_ORIGINS` in backend `.env` includes `http://localhost:3000`
- Check that both servers are running

**4. "PDF generation fails"**
```bash
# Install system dependencies for WeasyPrint
# See system dependencies section above
```

**5. "Port already in use"**
```bash
# Kill process using port 8000
lsof -ti:8000 | xargs kill -9
# Or use different port
uvicorn app.main:app --reload --port 8001
```

### Getting Help

1. Check the logs in your terminal
2. Visit API docs at http://localhost:8000/docs
3. Check Supabase dashboard for database issues
4. Open an issue on GitHub

## 🚀 Next Steps

Once you have everything running:

1. **Explore the codebase**: Check out the folder structure
2. **Read the API docs**: Visit http://localhost:8000/docs
3. **Try the demo**: Use the demo media kit feature
4. **Make changes**: Start customizing for your needs
5. **Deploy**: Follow the deployment guide when ready

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

---

**Happy coding! 🎉**
