from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import logging
import sys
from datetime import datetime

# Import configuration and database
from app.config import settings
from app.database import db

# Import routes
from app.routes.analyzer import router as analyzer_router
from app.routes.media_kit import router as media_kit_router

# Configure logging
logging.basicConfig(
    level=logging.INFO if not settings.debug else logging.DEBUG,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)

logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    logger.info("Starting Ifluencesa API...")
    
    # Test database connection
    try:
        health = await db.health_check()
        if health:
            logger.info("Database connection established")
        else:
            logger.warning("Database connection test failed")
    except Exception as e:
        logger.error(f"Database connection failed: {e}")
    
    yield
    
    # Shutdown
    logger.info("Shutting down Ifluencesa API...")

# Create FastAPI application
app = FastAPI(
    title=settings.app_name,
    version=settings.version,
    description="API for Ifluencesa - Influencer Media Kit Generator with Engagement Analytics",
    docs_url="/docs" if settings.debug else None,
    redoc_url="/redoc" if settings.debug else None,
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Add trusted host middleware for production
if not settings.debug:
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=["Ifluencesa-api.render.com", "api.Ifluencesa.app", "localhost"]
    )

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"Global exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": {
                "code": "INTERNAL_ERROR",
                "message": "An internal server error occurred",
                "timestamp": datetime.utcnow().isoformat()
            }
        }
    )

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Test database connection
        db_healthy = await db.health_check()
        
        return {
            "status": "healthy" if db_healthy else "degraded",
            "timestamp": datetime.utcnow().isoformat(),
            "version": settings.version,
            "database": "connected" if db_healthy else "disconnected"
        }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={
                "status": "unhealthy",
                "timestamp": datetime.utcnow().isoformat(),
                "version": settings.version,
                "error": str(e)
            }
        )

# Root endpoint
@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "name": settings.app_name,
        "version": settings.version,
        "description": "Ifluencesa API - Transform your social influence into professional media kits",
        "docs_url": "/docs" if settings.debug else None,
        "timestamp": datetime.utcnow().isoformat()
    }

# Include routers
app.include_router(analyzer_router)
app.include_router(media_kit_router)

# Additional routes for future features
@app.get("/api/v1/platforms")
async def get_supported_platforms():
    """Get list of supported social media platforms"""
    return {
        "platforms": [
            {
                "id": "instagram",
                "name": "Instagram",
                "icon": "📷",
                "avg_engagement_rate": 2.5,
                "handle_format": "@username"
            },
            {
                "id": "tiktok", 
                "name": "TikTok",
                "icon": "🎵",
                "avg_engagement_rate": 5.3,
                "handle_format": "@username"
            },
            {
                "id": "youtube",
                "name": "YouTube", 
                "icon": "📺",
                "avg_engagement_rate": 1.8,
                "handle_format": "@channelname"
            }
        ]
    }

# Middleware for request logging (development only)
if settings.debug:
    @app.middleware("http")
    async def log_requests(request, call_next):
        start_time = datetime.utcnow()
        
        # Process request
        response = await call_next(request)
        
        # Log request details
        process_time = (datetime.utcnow() - start_time).total_seconds()
        logger.info(
            f"{request.method} {request.url.path} - "
            f"Status: {response.status_code} - "
            f"Time: {process_time:.3f}s"
        )
        
        return response

# Error handlers for specific HTTP exceptions
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={
            "error": {
                "code": "NOT_FOUND",
                "message": "The requested resource was not found",
                "timestamp": datetime.utcnow().isoformat()
            }
        }
    )

@app.exception_handler(422)
async def validation_error_handler(request, exc):
    return JSONResponse(
        status_code=422,
        content={
            "error": {
                "code": "VALIDATION_ERROR", 
                "message": "Request validation failed",
                "details": exc.detail if hasattr(exc, 'detail') else None,
                "timestamp": datetime.utcnow().isoformat()
            }
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
        log_level="info"
    )
