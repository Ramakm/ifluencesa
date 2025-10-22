from supabase import create_client, Client
from app.config import settings
import logging

logger = logging.getLogger(__name__)

class SupabaseClient:
    def __init__(self):
        self.client: Client = None
        self.connect()
    
    def connect(self):
        """Initialize Supabase client"""
        try:
            self.client = create_client(
                settings.supabase_url,
                settings.supabase_service_key
            )
            logger.info("Connected to Supabase successfully")
        except Exception as e:
            logger.error(f"Failed to connect to Supabase: {e}")
            raise
    
    def get_client(self) -> Client:
        """Get Supabase client instance"""
        if not self.client:
            self.connect()
        return self.client
    
    async def health_check(self) -> bool:
        """Check if database connection is healthy"""
        try:
            # Simple query to test connection
            result = self.client.table('profiles').select('id').limit(1).execute()
            return True
        except Exception as e:
            logger.error(f"Database health check failed: {e}")
            return False

# Global database instance
db = SupabaseClient()

def get_database() -> Client:
    """Dependency to get database client"""
    return db.get_client()

# Database helper functions
class DatabaseOperations:
    def __init__(self, client: Client):
        self.client = client
    
    # Profile operations
    async def get_profile(self, user_id: str):
        """Get user profile by ID"""
        try:
            result = self.client.table('profiles').select('*').eq('id', user_id).single().execute()
            return result.data if result.data else None
        except Exception as e:
            logger.error(f"Error fetching profile {user_id}: {e}")
            return None
    
    async def create_profile(self, profile_data: dict):
        """Create new user profile"""
        try:
            result = self.client.table('profiles').insert(profile_data).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            logger.error(f"Error creating profile: {e}")
            raise
    
    async def update_profile(self, user_id: str, profile_data: dict):
        """Update user profile"""
        try:
            result = self.client.table('profiles').update(profile_data).eq('id', user_id).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            logger.error(f"Error updating profile {user_id}: {e}")
            raise
    
    # Social accounts operations
    async def get_social_accounts(self, user_id: str):
        """Get user's social accounts"""
        try:
            result = self.client.table('social_accounts').select('*').eq('user_id', user_id).execute()
            return result.data or []
        except Exception as e:
            logger.error(f"Error fetching social accounts for {user_id}: {e}")
            return []
    
    async def create_social_account(self, account_data: dict):
        """Create new social account"""
        try:
            result = self.client.table('social_accounts').insert(account_data).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            logger.error(f"Error creating social account: {e}")
            raise
    
    # Engagement analysis operations
    async def create_engagement_analysis(self, analysis_data: dict):
        """Create new engagement analysis"""
        try:
            result = self.client.table('engagement_analyses').insert(analysis_data).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            logger.error(f"Error creating engagement analysis: {e}")
            raise
    
    async def get_engagement_analysis(self, analysis_id: str):
        """Get engagement analysis by ID"""
        try:
            result = self.client.table('engagement_analyses').select('*').eq('id', analysis_id).single().execute()
            return result.data if result.data else None
        except Exception as e:
            logger.error(f"Error fetching engagement analysis {analysis_id}: {e}")
            return None
    
    # Media kit operations
    async def create_media_kit(self, kit_data: dict):
        """Create new media kit"""
        try:
            result = self.client.table('media_kits').insert(kit_data).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            logger.error(f"Error creating media kit: {e}")
            raise
    
    async def get_media_kit_by_username(self, username: str):
        """Get media kit by username"""
        try:
            # Join with profiles to get user info
            result = self.client.table('media_kits').select(
                '*, profiles!media_kits_user_id_fkey(username, full_name, avatar_url)'
            ).eq('profiles.username', username).eq('is_public', True).single().execute()
            return result.data if result.data else None
        except Exception as e:
            logger.error(f"Error fetching media kit for {username}: {e}")
            return None
    
    async def get_media_kit(self, kit_id: str):
        """Get media kit by ID"""
        try:
            result = self.client.table('media_kits').select('*').eq('id', kit_id).single().execute()
            return result.data if result.data else None
        except Exception as e:
            logger.error(f"Error fetching media kit {kit_id}: {e}")
            return None
    
    async def update_media_kit(self, kit_id: str, kit_data: dict):
        """Update media kit"""
        try:
            result = self.client.table('media_kits').update(kit_data).eq('id', kit_id).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            logger.error(f"Error updating media kit {kit_id}: {e}")
            raise
    
    # Media kit views operations
    async def track_media_kit_view(self, kit_id: str, viewer_data: dict):
        """Track media kit view"""
        try:
            # Insert view record
            view_data = {
                'media_kit_id': kit_id,
                **viewer_data
            }
            result = self.client.table('media_kit_views').insert(view_data).execute()
            
            # Get updated view count
            kit_result = self.client.table('media_kits').select('view_count').eq('id', kit_id).single().execute()
            return kit_result.data['view_count'] if kit_result.data else 0
        except Exception as e:
            logger.error(f"Error tracking view for media kit {kit_id}: {e}")
            return 0

def get_db_operations() -> DatabaseOperations:
    """Get database operations instance"""
    return DatabaseOperations(get_database())
