export type Platform = 'instagram' | 'tiktok' | 'youtube'

export interface User {
  id: string
  email: string
  username?: string
  full_name?: string
  bio?: string
  avatar_url?: string
  contact_email?: string
  created_at: string
  updated_at: string
}

export interface SocialAccount {
  id: string
  user_id: string
  platform: Platform
  handle: string
  followers: number
  is_primary: boolean
  created_at: string
  updated_at: string
}

export interface PostData {
  likes: number
  comments: number
  post_date: string
  image_url?: string
  caption?: string
}

export interface EngagementAnalysis {
  id: string
  user_id: string
  social_account_id: string
  engagement_rate: number
  avg_likes: number
  avg_comments: number
  total_engagement: number
  quality: 'poor' | 'average' | 'good' | 'excellent'
  insights: string[]
  post_data: PostData[]
  best_post: PostData
  created_at: string
}

export interface MediaKit {
  id: string
  user_id: string
  social_account_id: string
  engagement_analysis_id?: string
  title: string
  bio?: string
  top_posts: PostData[]
  contact_info: {
    email?: string
    website?: string
    phone?: string
  }
  branding: {
    primary_color?: string
    secondary_color?: string
    font?: string
  }
  is_public: boolean
  view_count: number
  pdf_generated_at?: string
  created_at: string
  updated_at: string
}

export interface AnalyzerFormData {
  platform: Platform
  handle: string
  followers: number
  posts: Array<{
    likes: number
    comments: number
    post_date: string
  }>
}

export interface MediaKitFormData {
  bio: string
  contact_email: string
  top_posts: Array<{
    likes: number
    comments: number
    image_url?: string
    caption?: string
  }>
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export interface EngagementMetrics {
  engagement_rate: number
  avg_likes: number
  avg_comments: number
  total_engagement: number
  quality: string
  insights: string[]
  best_post?: PostData
}

// Form validation schemas
export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData {
  email: string
  password: string
  full_name: string
}

export interface ProfileFormData {
  username: string
  full_name: string
  bio: string
  contact_email: string
}

// API Response types
export interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  has_more: boolean
}

// Error types
export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
  timestamp: string
}

// Component prop types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface LoadingState {
  isLoading: boolean
  error?: string | null
}

// Platform-specific configurations
export interface PlatformConfig {
  name: string
  icon: string
  color: string
  maxHandleLength: number
  handlePrefix: string
  avgEngagementRate: number
}

export const PLATFORM_CONFIGS: Record<Platform, PlatformConfig> = {
  instagram: {
    name: 'Instagram',
    icon: '📷',
    color: '#E4405F',
    maxHandleLength: 30,
    handlePrefix: '@',
    avgEngagementRate: 2.5,
  },
  tiktok: {
    name: 'TikTok',
    icon: '🎵',
    color: '#000000',
    maxHandleLength: 24,
    handlePrefix: '@',
    avgEngagementRate: 5.3,
  },
  youtube: {
    name: 'YouTube',
    icon: '📺',
    color: '#FF0000',
    maxHandleLength: 50,
    handlePrefix: '@',
    avgEngagementRate: 1.8,
  },
}
