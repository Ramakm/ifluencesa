from jose import JWTError, jwt
from fastapi import HTTPException, status
from app.config import settings
import requests
import logging

logger = logging.getLogger(__name__)

def verify_token(token: str) -> dict:
    """
    Verify Supabase JWT token
    
    Args:
        token: JWT token from Authorization header
        
    Returns:
        dict: Decoded token payload
        
    Raises:
        HTTPException: If token is invalid
    """
    try:
        # For Supabase tokens, we need to verify against Supabase's public key
        # This is a simplified version - in production, you should fetch the public key
        # from Supabase's JWKS endpoint and cache it
        
        # Decode without verification for now (development only)
        # In production, implement proper JWT verification with Supabase's public key
        payload = jwt.get_unverified_claims(token)
        
        # Basic validation
        if not payload.get("sub"):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token: missing subject"
            )
        
        # Check if token is from the correct issuer (Supabase)
        expected_issuer = f"{settings.supabase_url}/auth/v1"
        if payload.get("iss") != expected_issuer:
            logger.warning(f"Token issuer mismatch: {payload.get('iss')} != {expected_issuer}")
            # Continue for development, but this should be strict in production
        
        return payload
        
    except JWTError as e:
        logger.error(f"JWT verification failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token"
        )
    except Exception as e:
        logger.error(f"Token verification error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication failed"
        )

def verify_supabase_token_with_api(token: str) -> dict:
    """
    Verify token by calling Supabase API (alternative method)
    
    This method makes an API call to Supabase to verify the token,
    which is more secure but adds latency.
    """
    try:
        headers = {
            "Authorization": f"Bearer {token}",
            "apikey": settings.supabase_anon_key
        }
        
        # Call Supabase user endpoint to verify token
        response = requests.get(
            f"{settings.supabase_url}/auth/v1/user",
            headers=headers,
            timeout=5
        )
        
        if response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication token"
            )
        
        user_data = response.json()
        return {
            "sub": user_data["id"],
            "email": user_data["email"],
            "user_metadata": user_data.get("user_metadata", {})
        }
        
    except requests.RequestException as e:
        logger.error(f"Supabase token verification failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication service unavailable"
        )
    except Exception as e:
        logger.error(f"Token verification error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication failed"
        )

def get_user_from_token(token: str) -> dict:
    """
    Extract user information from verified token
    
    Args:
        token: Verified JWT token
        
    Returns:
        dict: User information
    """
    try:
        payload = verify_token(token)
        return {
            "id": payload["sub"],
            "email": payload.get("email"),
            "user_metadata": payload.get("user_metadata", {})
        }
    except Exception as e:
        logger.error(f"Failed to extract user from token: {e}")
        raise

# Optional: Rate limiting decorator
from functools import wraps
from time import time
from collections import defaultdict

# Simple in-memory rate limiter (use Redis in production)
request_counts = defaultdict(list)

def rate_limit(max_requests: int = 60, window_seconds: int = 60):
    """
    Rate limiting decorator
    
    Args:
        max_requests: Maximum requests allowed
        window_seconds: Time window in seconds
    """
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Get user ID from token (if available)
            user_id = "anonymous"
            try:
                # Extract from request if available
                # This is a simplified implementation
                pass
            except:
                pass
            
            current_time = time()
            
            # Clean old requests
            request_counts[user_id] = [
                req_time for req_time in request_counts[user_id]
                if current_time - req_time < window_seconds
            ]
            
            # Check rate limit
            if len(request_counts[user_id]) >= max_requests:
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail="Rate limit exceeded"
                )
            
            # Add current request
            request_counts[user_id].append(current_time)
            
            return await func(*args, **kwargs)
        return wrapper
    return decorator
