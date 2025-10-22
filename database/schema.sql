-- Ifluencesa MVP Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE platform_type AS ENUM ('instagram', 'tiktok', 'youtube');
CREATE TYPE engagement_quality AS ENUM ('poor', 'average', 'good', 'excellent');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE,
    full_name TEXT,
    bio TEXT,
    avatar_url TEXT,
    contact_email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social accounts table
CREATE TABLE public.social_accounts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    platform platform_type NOT NULL,
    handle TEXT NOT NULL,
    followers INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, platform, handle)
);

-- Engagement analyses table
CREATE TABLE public.engagement_analyses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    social_account_id UUID REFERENCES public.social_accounts(id) ON DELETE CASCADE,
    engagement_rate DECIMAL(5,2) NOT NULL,
    avg_likes INTEGER DEFAULT 0,
    avg_comments INTEGER DEFAULT 0,
    total_engagement INTEGER DEFAULT 0,
    quality engagement_quality DEFAULT 'average',
    insights JSONB DEFAULT '[]',
    post_data JSONB NOT NULL, -- Array of post objects
    best_post JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Media kits table
CREATE TABLE public.media_kits (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    social_account_id UUID REFERENCES public.social_accounts(id) ON DELETE CASCADE,
    engagement_analysis_id UUID REFERENCES public.engagement_analyses(id) ON DELETE SET NULL,
    title TEXT DEFAULT 'Media Kit',
    bio TEXT,
    top_posts JSONB DEFAULT '[]', -- Array of top post objects
    contact_info JSONB DEFAULT '{}', -- Contact details
    branding JSONB DEFAULT '{}', -- Colors, fonts, etc.
    is_public BOOLEAN DEFAULT TRUE,
    view_count INTEGER DEFAULT 0,
    pdf_generated_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Media kit views tracking
CREATE TABLE public.media_kit_views (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    media_kit_id UUID REFERENCES public.media_kits(id) ON DELETE CASCADE,
    viewer_ip INET,
    user_agent TEXT,
    referrer TEXT,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_profiles_username ON public.profiles(username);
CREATE INDEX idx_social_accounts_user_platform ON public.social_accounts(user_id, platform);
CREATE INDEX idx_social_accounts_handle ON public.social_accounts(handle);
CREATE INDEX idx_engagement_analyses_user_id ON public.engagement_analyses(user_id);
CREATE INDEX idx_media_kits_user_id ON public.media_kits(user_id);
CREATE INDEX idx_media_kits_public ON public.media_kits(is_public) WHERE is_public = true;
CREATE INDEX idx_media_kit_views_kit_id ON public.media_kit_views(media_kit_id);
CREATE INDEX idx_media_kit_views_viewed_at ON public.media_kit_views(viewed_at);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagement_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_kits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_kit_views ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Social accounts policies
CREATE POLICY "Users can manage own social accounts" ON public.social_accounts
    FOR ALL USING (auth.uid() = user_id);

-- Engagement analyses policies
CREATE POLICY "Users can manage own analyses" ON public.engagement_analyses
    FOR ALL USING (auth.uid() = user_id);

-- Media kits policies
CREATE POLICY "Users can manage own media kits" ON public.media_kits
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public media kits are viewable by anyone" ON public.media_kits
    FOR SELECT USING (is_public = true);

-- Media kit views policies (allow anonymous tracking)
CREATE POLICY "Anyone can insert media kit views" ON public.media_kit_views
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own media kit analytics" ON public.media_kit_views
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.media_kits mk 
            WHERE mk.id = media_kit_views.media_kit_id 
            AND mk.user_id = auth.uid()
        )
    );

-- Functions and triggers

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON public.profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_accounts_updated_at 
    BEFORE UPDATE ON public.social_accounts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_kits_updated_at 
    BEFORE UPDATE ON public.media_kits 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment media kit view count
CREATE OR REPLACE FUNCTION increment_media_kit_views()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.media_kits 
    SET view_count = view_count + 1 
    WHERE id = NEW.media_kit_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-increment view count
CREATE TRIGGER increment_view_count_trigger
    AFTER INSERT ON public.media_kit_views
    FOR EACH ROW EXECUTE FUNCTION increment_media_kit_views();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url, contact_email)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url',
        NEW.email
    );
    RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Sample data for development (optional)
-- Uncomment to insert test data

/*
-- Insert sample profile
INSERT INTO public.profiles (id, username, full_name, bio, contact_email) VALUES
(
    '00000000-0000-0000-0000-000000000001',
    'johndoe',
    'John Doe',
    'Content creator and lifestyle influencer sharing travel adventures and daily inspiration.',
    'john@example.com'
);

-- Insert sample social account
INSERT INTO public.social_accounts (user_id, platform, handle, followers, is_primary) VALUES
(
    '00000000-0000-0000-0000-000000000001',
    'instagram',
    'johndoe',
    15000,
    true
);

-- Insert sample engagement analysis
INSERT INTO public.engagement_analyses (
    user_id, 
    social_account_id, 
    engagement_rate, 
    avg_likes, 
    avg_comments, 
    total_engagement,
    quality,
    insights,
    post_data,
    best_post
) VALUES (
    '00000000-0000-0000-0000-000000000001',
    (SELECT id FROM public.social_accounts WHERE handle = 'johndoe' LIMIT 1),
    8.42,
    1210,
    48,
    1258,
    'excellent',
    '["Your engagement rate is 2.3x above industry average", "Comments show strong audience connection", "Post consistency is good for growth"]',
    '[
        {"likes": 1200, "comments": 45, "post_date": "2024-01-14T10:00:00Z"},
        {"likes": 980, "comments": 32, "post_date": "2024-01-13T15:30:00Z"},
        {"likes": 1450, "comments": 67, "post_date": "2024-01-12T09:15:00Z"}
    ]',
    '{"likes": 1450, "comments": 67, "engagement_rate": 10.11, "post_date": "2024-01-12T09:15:00Z"}'
);
*/
