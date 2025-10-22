from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from enum import Enum

class Platform(str, Enum):
    INSTAGRAM = "instagram"
    TIKTOK = "tiktok"
    YOUTUBE = "youtube"

class UserProfile(BaseModel):
    id: str
    email: EmailStr
    username: Optional[str] = None
    full_name: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    contact_email: Optional[EmailStr] = None
    created_at: datetime
    updated_at: datetime

class UserProfileCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=30, regex=r'^[a-zA-Z0-9_]+$')
    full_name: Optional[str] = Field(None, max_length=100)
    bio: Optional[str] = Field(None, max_length=500)
    contact_email: Optional[EmailStr] = None

class UserProfileUpdate(BaseModel):
    username: Optional[str] = Field(None, min_length=3, max_length=30, regex=r'^[a-zA-Z0-9_]+$')
    full_name: Optional[str] = Field(None, max_length=100)
    bio: Optional[str] = Field(None, max_length=500)
    avatar_url: Optional[str] = None
    contact_email: Optional[EmailStr] = None

class SocialAccount(BaseModel):
    id: str
    user_id: str
    platform: Platform
    handle: str = Field(..., min_length=1, max_length=50)
    followers: int = Field(..., ge=0)
    is_primary: bool = False
    created_at: datetime
    updated_at: datetime

class SocialAccountCreate(BaseModel):
    platform: Platform
    handle: str = Field(..., min_length=1, max_length=50)
    followers: int = Field(..., ge=0)
    is_primary: bool = False

class SocialAccountUpdate(BaseModel):
    handle: Optional[str] = Field(None, min_length=1, max_length=50)
    followers: Optional[int] = Field(None, ge=0)
    is_primary: Optional[bool] = None
