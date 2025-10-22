'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Plus, Trash2, Instagram, Youtube } from 'lucide-react'
import { Platform, PLATFORM_CONFIGS } from '@/types'
import { validateHandle, cleanHandle } from '@/lib/utils'

interface PostData {
  likes: number
  comments: number
  post_date: string
}

interface AnalyzerFormProps {
  onAnalyze: (data: {
    platform: Platform
    handle: string
    followers: number
    posts: PostData[]
  }) => void
  loading?: boolean
}

export default function AnalyzerForm({ onAnalyze, loading = false }: AnalyzerFormProps) {
  const [platform, setPlatform] = useState<Platform>('instagram')
  const [handle, setHandle] = useState('')
  const [followers, setFollowers] = useState<number>(0)
  const [posts, setPosts] = useState<PostData[]>([
    { likes: 0, comments: 0, post_date: new Date().toISOString().split('T')[0] },
    { likes: 0, comments: 0, post_date: new Date(Date.now() - 86400000).toISOString().split('T')[0] },
    { likes: 0, comments: 0, post_date: new Date(Date.now() - 172800000).toISOString().split('T')[0] }
  ])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!handle.trim()) {
      newErrors.handle = 'Handle is required'
    } else if (!validateHandle(handle)) {
      newErrors.handle = 'Invalid handle format'
    }

    if (followers <= 0) {
      newErrors.followers = 'Followers must be greater than 0'
    }

    posts.forEach((post, index) => {
      if (post.likes < 0) {
        newErrors[`post_${index}_likes`] = 'Likes cannot be negative'
      }
      if (post.comments < 0) {
        newErrors[`post_${index}_comments`] = 'Comments cannot be negative'
      }
    })

    if (posts.length < 1) {
      newErrors.posts = 'At least one post is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    onAnalyze({
      platform,
      handle: cleanHandle(handle),
      followers,
      posts: posts.filter(post => post.likes > 0 || post.comments > 0)
    })
  }

  const addPost = () => {
    if (posts.length < 10) {
      setPosts([...posts, {
        likes: 0,
        comments: 0,
        post_date: new Date().toISOString().split('T')[0]
      }])
    }
  }

  const removePost = (index: number) => {
    if (posts.length > 1) {
      setPosts(posts.filter((_, i) => i !== index))
    }
  }

  const updatePost = (index: number, field: keyof PostData, value: string | number) => {
    const updatedPosts = [...posts]
    updatedPosts[index] = { ...updatedPosts[index], [field]: value }
    setPosts(updatedPosts)
  }

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-4 w-4" />
      case 'youtube':
        return <Youtube className="h-4 w-4" />
      case 'tiktok':
        return <span className="text-sm">🎵</span>
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement Analyzer</CardTitle>
        <CardDescription>
          Enter your social media data to analyze your engagement rate and performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Platform Selection */}
          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select value={platform} onValueChange={(value: Platform) => setPlatform(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PLATFORM_CONFIGS).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center space-x-2">
                      {getPlatformIcon(key as Platform)}
                      <span>{config.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Handle Input */}
          <div className="space-y-2">
            <Label htmlFor="handle">
              {PLATFORM_CONFIGS[platform].name} Handle
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                @
              </span>
              <Input
                id="handle"
                type="text"
                placeholder="username"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="pl-8"
                maxLength={PLATFORM_CONFIGS[platform].maxHandleLength}
              />
            </div>
            {errors.handle && (
              <p className="text-sm text-destructive">{errors.handle}</p>
            )}
          </div>

          {/* Followers Count */}
          <div className="space-y-2">
            <Label htmlFor="followers">Followers Count</Label>
            <Input
              id="followers"
              type="number"
              placeholder="15000"
              value={followers || ''}
              onChange={(e) => setFollowers(parseInt(e.target.value) || 0)}
              min="1"
            />
            {errors.followers && (
              <p className="text-sm text-destructive">{errors.followers}</p>
            )}
          </div>

          {/* Posts Data */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Recent Posts Performance</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPost}
                disabled={posts.length >= 10}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Post
              </Button>
            </div>
            
            <div className="space-y-3">
              {posts.map((post, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium">Post {index + 1}</h4>
                    {posts.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removePost(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor={`likes-${index}`} className="text-xs">Likes</Label>
                      <Input
                        id={`likes-${index}`}
                        type="number"
                        placeholder="1200"
                        value={post.likes || ''}
                        onChange={(e) => updatePost(index, 'likes', parseInt(e.target.value) || 0)}
                        min="0"
                      />
                      {errors[`post_${index}_likes`] && (
                        <p className="text-xs text-destructive">{errors[`post_${index}_likes`]}</p>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor={`comments-${index}`} className="text-xs">Comments</Label>
                      <Input
                        id={`comments-${index}`}
                        type="number"
                        placeholder="45"
                        value={post.comments || ''}
                        onChange={(e) => updatePost(index, 'comments', parseInt(e.target.value) || 0)}
                        min="0"
                      />
                      {errors[`post_${index}_comments`] && (
                        <p className="text-xs text-destructive">{errors[`post_${index}_comments`]}</p>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor={`date-${index}`} className="text-xs">Post Date</Label>
                      <Input
                        id={`date-${index}`}
                        type="date"
                        value={post.post_date}
                        onChange={(e) => updatePost(index, 'post_date', e.target.value)}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {errors.posts && (
              <p className="text-sm text-destructive">{errors.posts}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Engagement'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
