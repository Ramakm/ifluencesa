from typing import List, Dict, Any
import statistics
from datetime import datetime
from app.models.media_kit import (
    EngagementAnalysisRequest, 
    EngagementAnalysisResponse, 
    EngagementQuality,
    PostData,
    Platform
)

class EngagementAnalyzer:
    """Service for analyzing social media engagement metrics"""
    
    # Industry average engagement rates (approximate)
    INDUSTRY_AVERAGES = {
        Platform.INSTAGRAM: 2.5,
        Platform.TIKTOK: 5.3,
        Platform.YOUTUBE: 1.8
    }
    
    def __init__(self):
        pass
    
    def analyze_engagement(self, request: EngagementAnalysisRequest) -> EngagementAnalysisResponse:
        """Analyze engagement metrics from post data"""
        
        # Calculate basic metrics
        total_likes = sum(post.likes for post in request.posts)
        total_comments = sum(post.comments for post in request.posts)
        total_posts = len(request.posts)
        
        avg_likes = total_likes / total_posts if total_posts > 0 else 0
        avg_comments = total_comments / total_posts if total_posts > 0 else 0
        total_engagement = total_likes + total_comments
        
        # Calculate engagement rate
        engagement_rate = self._calculate_engagement_rate(
            avg_likes, avg_comments, request.followers
        )
        
        # Determine engagement quality
        quality = self._determine_quality(engagement_rate, request.platform)
        
        # Find best performing post
        best_post = self._find_best_post(request.posts, request.followers)
        
        # Generate insights
        insights = self._generate_insights(
            engagement_rate, avg_likes, avg_comments, 
            request.followers, request.platform, request.posts
        )
        
        return EngagementAnalysisResponse(
            engagement_rate=round(engagement_rate, 2),
            avg_likes=int(avg_likes),
            avg_comments=int(avg_comments),
            total_engagement=total_engagement,
            engagement_quality=quality,
            insights=insights,
            best_post=best_post
        )
    
    def _calculate_engagement_rate(self, avg_likes: float, avg_comments: float, followers: int) -> float:
        """Calculate engagement rate as percentage"""
        if followers == 0:
            return 0.0
        return ((avg_likes + avg_comments) / followers) * 100
    
    def _determine_quality(self, engagement_rate: float, platform: Platform) -> EngagementQuality:
        """Determine engagement quality based on platform benchmarks"""
        industry_avg = self.INDUSTRY_AVERAGES.get(platform, 2.5)
        
        if engagement_rate >= industry_avg * 2:
            return EngagementQuality.EXCELLENT
        elif engagement_rate >= industry_avg * 1.2:
            return EngagementQuality.GOOD
        elif engagement_rate >= industry_avg * 0.8:
            return EngagementQuality.AVERAGE
        else:
            return EngagementQuality.POOR
    
    def _find_best_post(self, posts: List[PostData], followers: int) -> PostData:
        """Find the post with highest engagement rate"""
        if not posts:
            return None
        
        best_post = None
        best_rate = 0
        
        for post in posts:
            post_engagement = post.likes + post.comments
            post_rate = (post_engagement / followers) * 100 if followers > 0 else 0
            
            if post_rate > best_rate:
                best_rate = post_rate
                best_post = post
        
        return best_post
    
    def _generate_insights(
        self, 
        engagement_rate: float, 
        avg_likes: float, 
        avg_comments: float,
        followers: int, 
        platform: Platform, 
        posts: List[PostData]
    ) -> List[str]:
        """Generate actionable insights based on engagement data"""
        insights = []
        industry_avg = self.INDUSTRY_AVERAGES.get(platform, 2.5)
        
        # Engagement rate insights
        if engagement_rate > industry_avg * 1.5:
            multiplier = engagement_rate / industry_avg
            insights.append(f"Your engagement rate is {multiplier:.1f}x above industry average")
        elif engagement_rate > industry_avg:
            insights.append("Your engagement rate is above industry average")
        else:
            insights.append("Focus on creating more engaging content to improve your rate")
        
        # Comment ratio insights
        total_engagement = avg_likes + avg_comments
        if total_engagement > 0:
            comment_ratio = avg_comments / total_engagement
            if comment_ratio > 0.15:
                insights.append("Excellent comment engagement shows strong audience connection")
            elif comment_ratio > 0.08:
                insights.append("Good balance of likes and comments indicates engaged audience")
            else:
                insights.append("Consider asking questions to encourage more comments")
        
        # Follower size insights
        if followers > 100000:
            insights.append("Large audience with strong reach potential for brand partnerships")
        elif followers > 10000:
            insights.append("Growing audience size is attractive to mid-tier brand collaborations")
        else:
            insights.append("Focus on consistent posting and engagement to grow your audience")
        
        # Post consistency insights
        if len(posts) >= 3:
            engagement_values = [(post.likes + post.comments) for post in posts]
            if len(engagement_values) > 1:
                consistency = 1 - (statistics.stdev(engagement_values) / statistics.mean(engagement_values))
                if consistency > 0.7:
                    insights.append("Consistent engagement across posts shows reliable audience interest")
                else:
                    insights.append("Engagement varies significantly - analyze your top posts for patterns")
        
        # Platform-specific insights
        if platform == Platform.INSTAGRAM:
            if avg_likes > avg_comments * 20:  # High like-to-comment ratio
                insights.append("Consider using Instagram Stories and Reels to boost engagement")
        elif platform == Platform.TIKTOK:
            if engagement_rate < 3:
                insights.append("TikTok thrives on trending content - try incorporating popular sounds and hashtags")
        elif platform == Platform.YOUTUBE:
            if avg_comments < avg_likes * 0.02:  # Low comment rate for YouTube
                insights.append("Encourage viewers to comment by asking questions in your videos")
        
        return insights[:3]  # Return top 3 insights
    
    def calculate_brand_readiness_score(
        self, 
        engagement_rate: float, 
        followers: int, 
        platform: Platform,
        profile_completeness: float = 1.0
    ) -> Dict[str, Any]:
        """Calculate a brand readiness score (0-100)"""
        
        # Engagement score (40% weight)
        industry_avg = self.INDUSTRY_AVERAGES.get(platform, 2.5)
        engagement_score = min((engagement_rate / industry_avg) * 40, 40)
        
        # Follower score (30% weight)
        if followers >= 100000:
            follower_score = 30
        elif followers >= 50000:
            follower_score = 25
        elif followers >= 10000:
            follower_score = 20
        elif followers >= 5000:
            follower_score = 15
        elif followers >= 1000:
            follower_score = 10
        else:
            follower_score = 5
        
        # Profile completeness score (20% weight)
        completeness_score = profile_completeness * 20
        
        # Platform bonus (10% weight)
        platform_bonus = 10 if platform in [Platform.INSTAGRAM, Platform.TIKTOK] else 8
        
        total_score = min(engagement_score + follower_score + completeness_score + platform_bonus, 100)
        
        # Generate improvement recommendations
        recommendations = []
        if engagement_score < 20:
            recommendations.append("Improve engagement rate by posting more interactive content")
        if follower_score < 15:
            recommendations.append("Grow your follower base through consistent, quality content")
        if completeness_score < 15:
            recommendations.append("Complete your profile with bio, contact info, and profile picture")
        
        return {
            "score": int(total_score),
            "breakdown": {
                "engagement": int(engagement_score),
                "followers": int(follower_score),
                "profile": int(completeness_score),
                "platform": int(platform_bonus)
            },
            "recommendations": recommendations
        }
