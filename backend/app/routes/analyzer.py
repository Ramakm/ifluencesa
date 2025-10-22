from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.models.media_kit import EngagementAnalysisRequest, EngagementAnalysisResponse
from app.services.engagement import EngagementAnalyzer
from app.database import get_db_operations, DatabaseOperations
from app.utils.auth import verify_token
import logging
import uuid
from datetime import datetime

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1", tags=["engagement-analysis"])
security = HTTPBearer()

@router.post("/analyze", response_model=EngagementAnalysisResponse)
async def analyze_engagement(
    request: EngagementAnalysisRequest,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db_ops: DatabaseOperations = Depends(get_db_operations)
):
    """
    Analyze engagement metrics from social media post data
    
    This endpoint calculates engagement rates, identifies top-performing content,
    and provides actionable insights for content creators.
    """
    try:
        # Verify authentication token
        user_data = verify_token(credentials.credentials)
        user_id = user_data.get("sub")
        
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication token"
            )
        
        # Initialize engagement analyzer
        analyzer = EngagementAnalyzer()
        
        # Perform analysis
        analysis_result = analyzer.analyze_engagement(request)
        
        # Store analysis in database
        try:
            # First, create or get social account
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
            
            # Store engagement analysis
            analysis_data = {
                "id": str(uuid.uuid4()),
                "user_id": user_id,
                "social_account_id": social_account["id"],
                "engagement_rate": analysis_result.engagement_rate,
                "avg_likes": analysis_result.avg_likes,
                "avg_comments": analysis_result.avg_comments,
                "total_engagement": analysis_result.total_engagement,
                "quality": analysis_result.engagement_quality.value,
                "insights": analysis_result.insights,
                "post_data": [post.dict() for post in request.posts],
                "best_post": analysis_result.best_post.dict() if analysis_result.best_post else None,
                "created_at": datetime.utcnow().isoformat()
            }
            
            await db_ops.create_engagement_analysis(analysis_data)
            
        except Exception as db_error:
            logger.warning(f"Failed to store analysis in database: {db_error}")
            # Continue with response even if DB storage fails
        
        logger.info(f"Engagement analysis completed for user {user_id}, handle @{request.handle}")
        return analysis_result
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Engagement analysis failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to analyze engagement data"
        )

@router.get("/analyze/{analysis_id}")
async def get_analysis(
    analysis_id: str,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db_ops: DatabaseOperations = Depends(get_db_operations)
):
    """Get a previously stored engagement analysis"""
    try:
        # Verify authentication
        user_data = verify_token(credentials.credentials)
        user_id = user_data.get("sub")
        
        # Fetch analysis from database
        analysis = await db_ops.get_engagement_analysis(analysis_id)
        
        if not analysis:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Analysis not found"
            )
        
        # Verify ownership
        if analysis["user_id"] != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
        
        return analysis
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to fetch analysis {analysis_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch analysis"
        )

@router.post("/brand-readiness-score")
async def calculate_brand_readiness(
    request: EngagementAnalysisRequest,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Calculate brand readiness score based on engagement and profile data"""
    try:
        # Verify authentication
        verify_token(credentials.credentials)
        
        # Initialize analyzer
        analyzer = EngagementAnalyzer()
        
        # Perform basic analysis first
        analysis_result = analyzer.analyze_engagement(request)
        
        # Calculate brand readiness score
        readiness_score = analyzer.calculate_brand_readiness_score(
            engagement_rate=analysis_result.engagement_rate,
            followers=request.followers,
            platform=request.platform,
            profile_completeness=0.8  # TODO: Calculate based on actual profile data
        )
        
        return {
            "engagement_analysis": analysis_result,
            "brand_readiness": readiness_score
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Brand readiness calculation failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to calculate brand readiness score"
        )
