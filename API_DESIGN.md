# Windsurf Backend API Design

## Base URL
- **Development**: `http://localhost:8000`
- **Production**: `https://windsurf-api.render.com` (or Railway)

## Authentication
- **Method**: Supabase JWT tokens
- **Header**: `Authorization: Bearer <supabase_jwt_token>`

## API Endpoints

### 1. Health Check
```http
GET /health
```
**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0"
}
```

### 2. User Profile Management

#### Get User Profile
```http
GET /api/v1/profile
Authorization: Bearer <token>
```
**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "username": "johndoe",
  "full_name": "John Doe",
  "bio": "Content creator and influencer",
  "avatar_url": "https://...",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

#### Update User Profile
```http
PUT /api/v1/profile
Authorization: Bearer <token>
Content-Type: application/json
```
**Request:**
```json
{
  "username": "johndoe",
  "full_name": "John Doe",
  "bio": "Content creator and influencer",
  "avatar_url": "https://..."
}
```

### 3. Engagement Analysis

#### Analyze Engagement
```http
POST /api/v1/analyze
Authorization: Bearer <token>
Content-Type: application/json
```
**Request:**
```json
{
  "platform": "instagram",
  "handle": "johndoe",
  "followers": 15000,
  "posts": [
    {
      "likes": 1200,
      "comments": 45,
      "post_date": "2024-01-14T10:00:00Z"
    },
    {
      "likes": 980,
      "comments": 32,
      "post_date": "2024-01-13T15:30:00Z"
    },
    {
      "likes": 1450,
      "comments": 67,
      "post_date": "2024-01-12T09:15:00Z"
    }
  ]
}
```
**Response:**
```json
{
  "engagement_rate": 8.42,
  "avg_likes": 1210,
  "avg_comments": 48,
  "total_engagement": 1258,
  "engagement_quality": "excellent",
  "insights": [
    "Your engagement rate is 2.3x above industry average",
    "Comments show strong audience connection",
    "Post consistency is good for growth"
  ],
  "best_post": {
    "likes": 1450,
    "comments": 67,
    "engagement_rate": 10.11,
    "post_date": "2024-01-12T09:15:00Z"
  }
}
```

### 4. Media Kit Management

#### Create Media Kit
```http
POST /api/v1/media-kit
Authorization: Bearer <token>
Content-Type: application/json
```
**Request:**
```json
{
  "platform": "instagram",
  "handle": "johndoe",
  "followers": 15000,
  "engagement_data": {
    "engagement_rate": 8.42,
    "avg_likes": 1210,
    "avg_comments": 48
  },
  "bio": "Content creator focused on lifestyle and travel",
  "top_posts": [
    {
      "likes": 1450,
      "comments": 67,
      "image_url": "https://...",
      "caption": "Amazing sunset in Bali"
    }
  ],
  "contact_email": "john@example.com"
}
```
**Response:**
```json
{
  "id": "uuid",
  "username": "johndoe",
  "public_url": "https://windsurf.app/media-kit/johndoe",
  "pdf_url": "https://windsurf-api.render.com/api/v1/media-kit/uuid/pdf",
  "created_at": "2024-01-15T10:30:00Z",
  "view_count": 0
}
```

#### Get Media Kit
```http
GET /api/v1/media-kit/{username}
```
**Response:**
```json
{
  "id": "uuid",
  "username": "johndoe",
  "full_name": "John Doe",
  "platform": "instagram",
  "handle": "johndoe",
  "followers": 15000,
  "engagement_rate": 8.42,
  "avg_likes": 1210,
  "avg_comments": 48,
  "bio": "Content creator focused on lifestyle and travel",
  "top_posts": [...],
  "contact_email": "john@example.com",
  "avatar_url": "https://...",
  "created_at": "2024-01-15T10:30:00Z",
  "view_count": 42
}
```

#### Generate PDF
```http
GET /api/v1/media-kit/{kit_id}/pdf
```
**Response:** Binary PDF file with proper headers
```http
Content-Type: application/pdf
Content-Disposition: attachment; filename="johndoe-media-kit.pdf"
```

#### Track Media Kit View
```http
POST /api/v1/media-kit/{username}/view
```
**Response:**
```json
{
  "view_count": 43,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 5. AI-Powered Content (Future)

#### Generate Bio
```http
POST /api/v1/ai/generate-bio
Authorization: Bearer <token>
Content-Type: application/json
```
**Request:**
```json
{
  "platform": "instagram",
  "niche": "lifestyle",
  "tone": "professional",
  "key_points": ["travel", "photography", "wellness"]
}
```
**Response:**
```json
{
  "bio": "Lifestyle content creator sharing travel adventures and wellness tips. 📸 Photography enthusiast | ✈️ Digital nomad | 🧘 Wellness advocate",
  "alternatives": [
    "Travel photographer and wellness coach inspiring authentic living...",
    "Creating content that inspires wanderlust and mindful living..."
  ]
}
```

## Error Responses

### Standard Error Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": {
      "field": "followers",
      "issue": "Must be a positive integer"
    }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Error Codes
- `VALIDATION_ERROR` (400): Invalid request data
- `UNAUTHORIZED` (401): Missing or invalid auth token
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `RATE_LIMITED` (429): Too many requests
- `INTERNAL_ERROR` (500): Server error

## Rate Limiting
- **Analyze endpoint**: 10 requests per minute per user
- **PDF generation**: 5 requests per minute per user
- **General API**: 100 requests per minute per user

## Data Models (Pydantic)

### EngagementAnalysisRequest
```python
class PostData(BaseModel):
    likes: int = Field(ge=0)
    comments: int = Field(ge=0)
    post_date: datetime

class EngagementAnalysisRequest(BaseModel):
    platform: Literal["instagram", "tiktok", "youtube"]
    handle: str = Field(min_length=1, max_length=50)
    followers: int = Field(ge=0)
    posts: List[PostData] = Field(min_items=1, max_items=10)
```

### MediaKitRequest
```python
class TopPost(BaseModel):
    likes: int
    comments: int
    image_url: Optional[str] = None
    caption: Optional[str] = None

class MediaKitRequest(BaseModel):
    platform: Literal["instagram", "tiktok", "youtube"]
    handle: str
    followers: int
    engagement_data: dict
    bio: Optional[str] = None
    top_posts: List[TopPost] = []
    contact_email: Optional[str] = None
```

## Database Operations
- **Create**: Store analysis results and media kits
- **Read**: Fetch user profiles and public media kits
- **Update**: Modify user profiles and media kit data
- **Delete**: Remove media kits (soft delete with retention)

## Security Considerations
- **JWT validation**: Verify Supabase tokens on protected routes
- **Input sanitization**: Clean all user inputs
- **Rate limiting**: Prevent abuse of expensive operations
- **CORS**: Configure for frontend domain only
- **SQL injection**: Use parameterized queries via Supabase client
