from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum
from .user import Platform

class EngagementQuality(str, Enum):
    POOR = "poor"
    AVERAGE = "average"
    GOOD = "good"
    EXCELLENT = "excellent"

class PostData(BaseModel):
    likes: int = Field(..., ge=0)
    comments: int = Field(..., ge=0)
    post_date: datetime
    image_url: Optional[str] = None
    caption: Optional[str] = Field(None, max_length=500)

class EngagementAnalysisRequest(BaseModel):
    platform: Platform
    handle: str = Field(..., min_length=1, max_length=50)
    followers: int = Field(..., ge=1)
    posts: List[PostData] = Field(..., min_items=1, max_items=10)

class EngagementAnalysisResponse(BaseModel):
    engagement_rate: float = Field(..., ge=0, le=100)
    avg_likes: int = Field(..., ge=0)
    avg_comments: int = Field(..., ge=0)
    total_engagement: int = Field(..., ge=0)
    engagement_quality: EngagementQuality
    insights: List[str] = Field(..., max_items=5)
    best_post: Optional[PostData] = None

class TopPost(BaseModel):
    likes: int = Field(..., ge=0)
    comments: int = Field(..., ge=0)
    image_url: Optional[str] = None
    caption: Optional[str] = Field(None, max_length=500)

class MediaKitRequest(BaseModel):
    platform: Platform
    handle: str = Field(..., min_length=1, max_length=50)
    followers: int = Field(..., ge=1)
    engagement_data: Dict[str, Any]  # Flexible engagement data
    bio: Optional[str] = Field(None, max_length=1000)
    top_posts: List[TopPost] = Field(default_factory=list, max_items=10)
    contact_email: Optional[EmailStr] = None

class MediaKitResponse(BaseModel):
    id: str
    username: str
    public_url: str
    pdf_url: str
    created_at: datetime
    view_count: int = 0

class MediaKitPublic(BaseModel):
    id: str
    username: str
    full_name: Optional[str] = None
    platform: Platform
    handle: str
    followers: int
    engagement_rate: float
    avg_likes: int
    avg_comments: int
    bio: Optional[str] = None
    top_posts: List[TopPost] = Field(default_factory=list)
    contact_email: Optional[str] = None
    avatar_url: Optional[str] = None
    created_at: datetime
    view_count: int = 0

class MediaKitViewResponse(BaseModel):
    view_count: int
    timestamp: datetime

class EngagementAnalysis(BaseModel):
    id: str
    user_id: str
    social_account_id: str
    engagement_rate: float
    avg_likes: int
    avg_comments: int
    total_engagement: int
    quality: EngagementQuality
    insights: List[str]
    post_data: List[Dict[str, Any]]
    best_post: Optional[Dict[str, Any]] = None
    created_at: datetime

class MediaKit(BaseModel):
    id: str
    user_id: str
    social_account_id: str
    engagement_analysis_id: Optional[str] = None
    title: str = "Media Kit"
    bio: Optional[str] = None
    top_posts: List[Dict[str, Any]] = Field(default_factory=list)
    contact_info: Dict[str, Any] = Field(default_factory=dict)
    branding: Dict[str, Any] = Field(default_factory=dict)
    is_public: bool = True
    view_count: int = 0
    pdf_generated_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

# AI-powered content generation models
class BioGenerationRequest(BaseModel):
    platform: Platform
    niche: str = Field(..., min_length=1, max_length=50)
    tone: str = Field(default="professional", regex=r'^(professional|casual|friendly|creative)$')
    key_points: List[str] = Field(default_factory=list, max_items=5)

class BioGenerationResponse(BaseModel):
    bio: str
    alternatives: List[str] = Field(default_factory=list, max_items=3)
