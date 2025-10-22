from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # App Configuration
    app_name: str = "Windsurf API"
    version: str = "1.0.0"
    debug: bool = False
    
    # Server Configuration
    host: str = "0.0.0.0"
    port: int = 8000
    
    # Supabase Configuration
    supabase_url: str
    supabase_service_key: str
    supabase_anon_key: str = ""
    
    # CORS Configuration
    cors_origins: List[str] = [
        "http://localhost:3000",
        "https://windsurf.vercel.app",
        "https://windsurf.app"
    ]
    
    # OpenAI Configuration (Optional)
    openai_api_key: str = ""
    
    # Security
    secret_key: str = "your-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # PDF Generation
    wkhtmltopdf_path: str = "/usr/local/bin/wkhtmltopdf"
    
    # Rate Limiting
    rate_limit_requests: int = 100
    rate_limit_window: int = 60  # seconds
    
    # File Upload
    max_file_size: int = 5 * 1024 * 1024  # 5MB
    allowed_extensions: List[str] = [".jpg", ".jpeg", ".png", ".gif", ".webp"]
    
    class Config:
        env_file = ".env"
        case_sensitive = False

# Global settings instance
settings = Settings()

# Environment-specific configurations
if os.getenv("ENVIRONMENT") == "production":
    settings.debug = False
    settings.cors_origins = [
        "https://windsurf.vercel.app",
        "https://windsurf.app"
    ]
elif os.getenv("ENVIRONMENT") == "development":
    settings.debug = True
    settings.cors_origins.extend([
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ])
