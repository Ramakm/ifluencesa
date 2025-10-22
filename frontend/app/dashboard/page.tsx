'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import AnalyzerForm from '@/components/dashboard/AnalyzerForm'
import ResultsPreview from '@/components/dashboard/ResultsPreview'
import { useAuth } from '@/hooks/useAuth'
import { apiClient, type AnalyzeRequest, type AnalyzeResponse } from '@/lib/api'
import { LogOut, Settings, FileText, BarChart3 } from 'lucide-react'
import { generateInsights } from '@/lib/utils'
import { Platform } from '@/types'

interface AnalysisResult extends AnalyzeResponse {
  platform: Platform
  handle: string
  followers: number
}

export default function DashboardPage() {
  const { user, loading: authLoading, signOut } = useAuth()
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [generatingKit, setGeneratingKit] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      // Set the auth token for API calls
      const getToken = async () => {
        const { data: { session } } = await user.getSession?.() || { data: { session: null } }
        if (session?.access_token) {
          apiClient.setToken(session.access_token)
        }
      }
      getToken()
    }
  }, [user])

  const handleAnalyze = async (data: AnalyzeRequest) => {
    setAnalyzing(true)
    try {
      const result = await apiClient.analyzeEngagement(data)
      
      // Add generated insights if not provided by API
      const insights = result.insights?.length > 0 
        ? result.insights 
        : generateInsights(result.engagement_rate, result.avg_likes, result.avg_comments, data.followers)

      setAnalysisResult({
        ...result,
        insights,
        platform: data.platform,
        handle: data.handle,
        followers: data.followers
      })
    } catch (error) {
      console.error('Analysis failed:', error)
      // For demo purposes, generate mock data if API fails
      const mockResult: AnalysisResult = {
        engagement_rate: ((data.posts.reduce((sum, post) => sum + post.likes + post.comments, 0) / data.posts.length) / data.followers) * 100,
        avg_likes: Math.round(data.posts.reduce((sum, post) => sum + post.likes, 0) / data.posts.length),
        avg_comments: Math.round(data.posts.reduce((sum, post) => sum + post.comments, 0) / data.posts.length),
        total_engagement: data.posts.reduce((sum, post) => sum + post.likes + post.comments, 0),
        engagement_quality: 'good',
        insights: generateInsights(
          ((data.posts.reduce((sum, post) => sum + post.likes + post.comments, 0) / data.posts.length) / data.followers) * 100,
          Math.round(data.posts.reduce((sum, post) => sum + post.likes, 0) / data.posts.length),
          Math.round(data.posts.reduce((sum, post) => sum + post.comments, 0) / data.posts.length),
          data.followers
        ),
        best_post: data.posts.reduce((best, current) => 
          (current.likes + current.comments) > (best.likes + best.comments) ? current : best
        ),
        platform: data.platform,
        handle: data.handle,
        followers: data.followers
      }
      setAnalysisResult(mockResult)
    } finally {
      setAnalyzing(false)
    }
  }

  const handleGenerateMediaKit = async () => {
    if (!analysisResult) return

    setGeneratingKit(true)
    try {
      const mediaKitData = {
        platform: analysisResult.platform,
        handle: analysisResult.handle,
        followers: analysisResult.followers,
        engagement_data: analysisResult,
        bio: `${analysisResult.platform} creator with ${analysisResult.engagement_rate.toFixed(1)}% engagement rate`,
        top_posts: [
          {
            likes: analysisResult.best_post?.likes || 0,
            comments: analysisResult.best_post?.comments || 0,
            caption: 'Top performing content'
          }
        ],
        contact_email: user?.email || ''
      }

      const result = await apiClient.createMediaKit(mediaKitData)
      router.push(`/media-kit/${result.username}`)
    } catch (error) {
      console.error('Media kit generation failed:', error)
      // For demo, redirect to a demo media kit
      router.push('/media-kit/demo')
    } finally {
      setGeneratingKit(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-xl font-bold gradient-text">Ifluencesa</span>
            </div>
            <div className="hidden md:block text-muted-foreground">
              Welcome back, {user.user_metadata?.full_name || user.email}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <a href="/settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </a>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Analyzer Form */}
          <div>
            <AnalyzerForm onAnalyze={handleAnalyze} loading={analyzing} />
          </div>

          {/* Right Column - Results or Welcome */}
          <div>
            {analysisResult ? (
              <ResultsPreview 
                data={analysisResult}
                onGenerateMediaKit={handleGenerateMediaKit}
                loading={generatingKit}
              />
            ) : (
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Ready to Analyze?</span>
                  </CardTitle>
                  <CardDescription>
                    Fill out the form on the left to get started with your engagement analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Create Your First Media Kit</h3>
                    <p className="text-muted-foreground mb-4">
                      Enter your social media data to generate professional media kits and analyze your engagement performance.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Choose Your Platform</h4>
                        <p className="text-sm text-muted-foreground">Select Instagram, TikTok, or YouTube</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Enter Your Data</h4>
                        <p className="text-sm text-muted-foreground">Add your handle, followers, and recent post performance</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Get Insights & Media Kit</h4>
                        <p className="text-sm text-muted-foreground">Analyze your engagement and generate a professional media kit</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
