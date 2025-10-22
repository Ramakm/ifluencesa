from fastapi import APIRouter, HTTPException, Depends, status, Response
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import StreamingResponse
from app.models.media_kit import (
    MediaKitRequest, 
    MediaKitResponse, 
    MediaKitPublic,
    MediaKitViewResponse
)
from app.services.pdf_generator import get_pdf_generator
from app.database import get_db_operations, DatabaseOperations
from app.utils.auth import verify_token
import logging
import uuid
from datetime import datetime
from typing import Optional
import io

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1", tags=["media-kit"])
security = HTTPBearer()

@router.post("/media-kit", response_model=MediaKitResponse)
async def create_media_kit(
    request: MediaKitRequest,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db_ops: DatabaseOperations = Depends(get_db_operations)
):
    """
    Create a new media kit from engagement data and user profile
    """
    try:
        # Verify authentication
        user_data = verify_token(credentials.credentials)
        user_id = user_data.get("sub")
        
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication token"
            )
        
        # Get or create user profile
        profile = await db_ops.get_profile(user_id)
        if not profile:
            # Create basic profile
            profile_data = {
                "id": user_id,
                "email": user_data.get("email"),
                "username": request.handle,  # Use handle as default username
                "full_name": user_data.get("user_metadata", {}).get("full_name"),
                "contact_email": request.contact_email or user_data.get("email"),
                "created_at": datetime.utcnow().isoformat(),
                "updated_at": datetime.utcnow().isoformat()
            }
            profile = await db_ops.create_profile(profile_data)
        
        # Create or update social account
        social_account_data = {
            "id": str(uuid.uuid4()),
            "user_id": user_id,
            "platform": request.platform.value,
            "handle": request.handle,
            "followers": request.followers,
            "is_primary": True,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }
        
        social_account = await db_ops.create_social_account(social_account_data)
        
        # Create media kit
        media_kit_data = {
            "id": str(uuid.uuid4()),
            "user_id": user_id,
            "social_account_id": social_account["id"],
            "title": f"{profile.get('full_name', request.handle)}'s Media Kit",
            "bio": request.bio,
            "top_posts": [post.dict() for post in request.top_posts],
            "contact_info": {
                "email": request.contact_email or profile.get("contact_email"),
                "platform_handle": request.handle
            },
            "branding": {},
            "is_public": True,
            "view_count": 0,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }
        
        media_kit = await db_ops.create_media_kit(media_kit_data)
        
        # Generate response
        username = profile.get("username") or request.handle
        base_url = "https://Ifluencesa.app"  # TODO: Get from config
        
        response = MediaKitResponse(
            id=media_kit["id"],
            username=username,
            public_url=f"{base_url}/media-kit/{username}",
            pdf_url=f"{base_url}/api/v1/media-kit/{media_kit['id']}/pdf",
            created_at=datetime.fromisoformat(media_kit["created_at"]),
            view_count=0
        )
        
        logger.info(f"Media kit created for user {user_id}, handle @{request.handle}")
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Media kit creation failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create media kit"
        )

@router.get("/media-kit/{username}", response_model=MediaKitPublic)
async def get_media_kit(
    username: str,
    db_ops: DatabaseOperations = Depends(get_db_operations)
):
    """
    Get public media kit by username
    """
    try:
        # Fetch media kit from database
        media_kit_data = await db_ops.get_media_kit_by_username(username)
        
        if not media_kit_data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Media kit not found"
            )
        
        # Extract profile data
        profile = media_kit_data.get("profiles", {})
        
        # Build response
        response = MediaKitPublic(
            id=media_kit_data["id"],
            username=profile.get("username", username),
            full_name=profile.get("full_name"),
            platform=media_kit_data["platform"],
            handle=media_kit_data["handle"],
            followers=media_kit_data["followers"],
            engagement_rate=media_kit_data.get("engagement_rate", 0),
            avg_likes=media_kit_data.get("avg_likes", 0),
            avg_comments=media_kit_data.get("avg_comments", 0),
            bio=media_kit_data.get("bio"),
            top_posts=media_kit_data.get("top_posts", []),
            contact_email=media_kit_data.get("contact_info", {}).get("email"),
            avatar_url=profile.get("avatar_url"),
            created_at=datetime.fromisoformat(media_kit_data["created_at"]),
            view_count=media_kit_data.get("view_count", 0)
        )
        
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to fetch media kit for {username}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch media kit"
        )

@router.post("/media-kit/{username}/view", response_model=MediaKitViewResponse)
async def track_media_kit_view(
    username: str,
    request: Optional[dict] = None,
    db_ops: DatabaseOperations = Depends(get_db_operations)
):
    """
    Track a view of the media kit
    """
    try:
        # Get media kit ID
        media_kit_data = await db_ops.get_media_kit_by_username(username)
        
        if not media_kit_data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Media kit not found"
            )
        
        # Track view
        viewer_data = {
            "viewer_ip": request.get("ip") if request else None,
            "user_agent": request.get("user_agent") if request else None,
            "referrer": request.get("referrer") if request else None,
            "viewed_at": datetime.utcnow().isoformat()
        }
        
        view_count = await db_ops.track_media_kit_view(
            media_kit_data["id"], 
            viewer_data
        )
        
        return MediaKitViewResponse(
            view_count=view_count,
            timestamp=datetime.utcnow()
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to track view for {username}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to track view"
        )

@router.get("/media-kit/{kit_id}/pdf")
async def generate_media_kit_pdf(
    kit_id: str,
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
    db_ops: DatabaseOperations = Depends(get_db_operations)
):
    """
    Generate and download PDF version of media kit
    """
    try:
        # Verify authentication for PDF generation
        if credentials:
            user_data = verify_token(credentials.credentials)
            user_id = user_data.get("sub")
        else:
            user_id = None
        
        # Fetch media kit
        media_kit = await db_ops.get_media_kit(kit_id)
        
        if not media_kit:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Media kit not found"
            )
        
        # Check permissions (owner or public)
        if not media_kit.get("is_public") and media_kit.get("user_id") != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
        
        # Get user profile for additional data
        profile = await db_ops.get_profile(media_kit["user_id"])
        
        # Prepare data for PDF generation
        pdf_data = {
            "username": profile.get("username", "creator"),
            "full_name": profile.get("full_name"),
            "handle": media_kit.get("handle", ""),
            "platform": media_kit.get("platform", "instagram"),
            "followers": media_kit.get("followers", 0),
            "engagement_rate": media_kit.get("engagement_rate", 0),
            "avg_likes": media_kit.get("avg_likes", 0),
            "avg_comments": media_kit.get("avg_comments", 0),
            "engagement_quality": "good",  # Default
            "bio": media_kit.get("bio", "Content creator and influencer"),
            "top_posts": media_kit.get("top_posts", []),
            "contact_email": media_kit.get("contact_info", {}).get("email", ""),
            "avatar_url": profile.get("avatar_url"),
            "insights": []  # TODO: Get from engagement analysis
        }
        
        # Generate PDF
        pdf_generator = get_pdf_generator()
        pdf_bytes = pdf_generator.generate_media_kit_pdf(pdf_data)
        
        # Update PDF generation timestamp
        await db_ops.update_media_kit(kit_id, {
            "pdf_generated_at": datetime.utcnow().isoformat()
        })
        
        # Return PDF as streaming response
        filename = f"{pdf_data['username']}-media-kit.pdf"
        
        return StreamingResponse(
            io.BytesIO(pdf_bytes),
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename={filename}"
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"PDF generation failed for kit {kit_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate PDF"
        )

@router.get("/media-kit/{kit_id}")
async def get_media_kit_by_id(
    kit_id: str,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db_ops: DatabaseOperations = Depends(get_db_operations)
):
    """
    Get media kit by ID (requires authentication)
    """
    try:
        # Verify authentication
        user_data = verify_token(credentials.credentials)
        user_id = user_data.get("sub")
        
        # Fetch media kit
        media_kit = await db_ops.get_media_kit(kit_id)
        
        if not media_kit:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Media kit not found"
            )
        
        # Verify ownership
        if media_kit["user_id"] != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
        
        return media_kit
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to fetch media kit {kit_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch media kit"
        )
