'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { 
  Download, 
  Share2, 
  Mail, 
  ExternalLink, 
  Heart, 
  MessageCircle, 
  Users,
  TrendingUp,
  Calendar,
  ArrowLeft
} from 'lucide-react'
import { formatNumber, formatDate, getEngagementQuality } from '@/lib/utils'
import { apiClient, downloadPDF } from '@/lib/api'
import { MediaKit, PLATFORM_CONFIGS } from '@/types'

export default function MediaKitPage() {
  const params = useParams()
  const username = params.username as string
  const [mediaKit, setMediaKit] = useState<MediaKit | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    const fetchMediaKit = async () => {
      try {
        if (username === 'demo') {
          // Load demo data
          setMediaKit(getDemoMediaKit())
        } else {
          const data = await apiClient.getMediaKit(username)
          setMediaKit(data)
          // Track view
          await apiClient.trackMediaKitView(username)
        }
      } catch (err) {
        setError('Media kit not found')
        console.error('Failed to fetch media kit:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMediaKit()
  }, [username])

  const handleDownloadPDF = async () => {
    if (!mediaKit) return
    
    setDownloading(true)
    try {
      const blob = await apiClient.generatePDF(mediaKit.id)
      downloadPDF(blob, `${mediaKit.username}-media-kit.pdf`)
    } catch (err) {
      console.error('Failed to download PDF:', err)
    } finally {
      setDownloading(false)
    }
  }

  const handleShare = async () => {
    const url = window.location.href
    const title = `${mediaKit?.full_name || mediaKit?.username}'s Media Kit`
    
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(url)
      }
    } else {
      navigator.clipboard.writeText(url)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50">
        <div className="animate-pulse text-muted-foreground">Loading media kit...</div>
      </div>
    )
  }

  if (error || !mediaKit) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Media Kit Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The media kit you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const platformConfig = PLATFORM_CONFIGS[mediaKit.platform as keyof typeof PLATFORM_CONFIGS]
  const { quality, color } = getEngagementQuality(mediaKit.engagement_rate)

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Windsurf
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            {username !== 'demo' && (
              <Button 
                size="sm" 
                onClick={handleDownloadPDF}
                disabled={downloading}
              >
                <Download className="h-4 w-4 mr-2" />
                {downloading ? 'Generating...' : 'Download PDF'}
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={mediaKit.avatar_url} alt={mediaKit.full_name} />
                <AvatarFallback className="text-2xl">
                  {mediaKit.full_name?.charAt(0) || mediaKit.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{mediaKit.full_name || mediaKit.username}</h1>
                    <div className="flex items-center space-x-4 text-muted-foreground">
                      <span className="flex items-center">
                        <span className="mr-2">{platformConfig?.icon}</span>
                        @{mediaKit.handle}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {formatNumber(mediaKit.followers)} followers
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <Badge variant="secondary" className={`${color} border`}>
                      {quality} Engagement
                    </Badge>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{mediaKit.engagement_rate.toFixed(2)}%</div>
                      <div className="text-xs text-muted-foreground">Engagement Rate</div>
                    </div>
                  </div>
                </div>
                
                {mediaKit.bio && (
                  <p className="text-muted-foreground leading-relaxed">{mediaKit.bio}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                Average Likes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(mediaKit.avg_likes)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {((mediaKit.avg_likes / mediaKit.followers) * 100).toFixed(1)}% of followers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                Average Comments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(mediaKit.avg_comments)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {((mediaKit.avg_comments / mediaKit.followers) * 100).toFixed(2)}% comment rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Total Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatNumber(mediaKit.avg_likes + mediaKit.avg_comments)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Per post average
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Top Posts */}
        {mediaKit.top_posts && mediaKit.top_posts.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
              <CardDescription>
                Showcase of highest engagement posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mediaKit.top_posts.slice(0, 6).map((post, index) => (
                  <Card key={index} className="overflow-hidden">
                    {post.image_url ? (
                      <div className="aspect-square bg-muted">
                        <img 
                          src={post.image_url} 
                          alt={`Post ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <span className="text-4xl">{platformConfig?.icon}</span>
                      </div>
                    )}
                    <CardContent className="p-4">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center text-red-500">
                          <Heart className="h-3 w-3 mr-1" />
                          {formatNumber(post.likes)}
                        </span>
                        <span className="flex items-center text-blue-500">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          {formatNumber(post.comments)}
                        </span>
                      </div>
                      {post.caption && (
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                          {post.caption}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Let's Collaborate</CardTitle>
            <CardDescription>
              Ready to work together? Get in touch!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              {mediaKit.contact_email && (
                <Button asChild className="flex-1">
                  <a href={`mailto:${mediaKit.contact_email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </a>
                </Button>
              )}
              
              <Button variant="outline" asChild className="flex-1">
                <a 
                  href={`https://${platformConfig?.name.toLowerCase()}.com/${mediaKit.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Profile
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8">
          <Separator className="mb-6" />
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Generated {formatDate(mediaKit.created_at)}</span>
            </div>
            {mediaKit.view_count > 0 && (
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>{mediaKit.view_count} views</span>
              </div>
            )}
          </div>
          <div className="mt-4">
            <Link href="/" className="text-primary hover:underline font-medium">
              Powered by Windsurf
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Demo data for testing
function getDemoMediaKit(): MediaKit {
  return {
    id: 'demo',
    username: 'demo',
    full_name: 'Alex Creator',
    platform: 'instagram',
    handle: 'alexcreator',
    followers: 25000,
    engagement_rate: 4.2,
    avg_likes: 850,
    avg_comments: 65,
    bio: 'Lifestyle content creator sharing daily inspiration, travel adventures, and authentic moments. Passionate about sustainable living and mindful experiences.',
    top_posts: [
      {
        likes: 1200,
        comments: 89,
        caption: 'Morning coffee ritual ☕️ Starting the day with gratitude and intention'
      },
      {
        likes: 980,
        comments: 67,
        caption: 'Sunset hike adventures 🌅 Nature therapy at its finest'
      },
      {
        likes: 1150,
        comments: 78,
        caption: 'Sustainable living tips that actually work 🌱'
      },
      {
        likes: 890,
        comments: 56,
        caption: 'Weekend farmers market haul 🥕 Supporting local businesses'
      }
    ],
    contact_email: 'hello@alexcreator.com',
    avatar_url: '',
    created_at: new Date().toISOString(),
    view_count: 127
  }
}
