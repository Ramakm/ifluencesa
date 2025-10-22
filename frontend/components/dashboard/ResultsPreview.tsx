'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { TrendingUp, Users, Heart, MessageCircle, Star, Download, Share2 } from 'lucide-react'
import { formatNumber, getEngagementQuality } from '@/lib/utils'
import { EngagementMetrics, Platform, PLATFORM_CONFIGS } from '@/types'

interface ResultsPreviewProps {
  data: EngagementMetrics & {
    platform: Platform
    handle: string
    followers: number
  }
  onGenerateMediaKit: () => void
  onDownloadPDF?: () => void
  loading?: boolean
}

export default function ResultsPreview({ 
  data, 
  onGenerateMediaKit, 
  onDownloadPDF,
  loading = false 
}: ResultsPreviewProps) {
  const { quality, color } = getEngagementQuality(data.engagement_rate)
  const platformConfig = PLATFORM_CONFIGS[data.platform]
  const industryAvg = platformConfig.avgEngagementRate
  
  // Calculate performance vs industry average
  const performanceRatio = data.engagement_rate / industryAvg
  const performancePercentage = Math.min((performanceRatio - 1) * 100, 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="gradient-bg text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center space-x-2">
                <span className="text-2xl">{platformConfig.icon}</span>
                <span>@{data.handle}</span>
              </CardTitle>
              <CardDescription className="text-white/80">
                {formatNumber(data.followers)} followers on {platformConfig.name}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {quality} Performance
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Engagement Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.engagement_rate.toFixed(2)}%</div>
            <div className="flex items-center space-x-2 mt-2">
              <Progress 
                value={Math.min(data.engagement_rate * 10, 100)} 
                className="flex-1" 
              />
              <span className={`text-xs font-medium ${color}`}>
                {quality}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Likes
              </CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(data.avg_likes)}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {((data.avg_likes / data.followers) * 100).toFixed(1)}% of followers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Comments
              </CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(data.avg_comments)}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {((data.avg_comments / data.followers) * 100).toFixed(2)}% comment rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5" />
            <span>Performance vs Industry</span>
          </CardTitle>
          <CardDescription>
            How your engagement compares to {platformConfig.name} average
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Your Rate</span>
              <span className="text-sm font-bold">{data.engagement_rate.toFixed(2)}%</span>
            </div>
            <Progress value={(data.engagement_rate / 10) * 100} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Industry Avg: {industryAvg}%</span>
              {performanceRatio > 1 ? (
                <span className="text-green-600 font-medium">
                  +{performancePercentage.toFixed(0)}% above average
                </span>
              ) : (
                <span className="text-orange-600 font-medium">
                  {performancePercentage.toFixed(0)}% below average
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
          <CardDescription>
            Actionable recommendations to improve your performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {data.insights.map((insight, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm">{insight}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Best Post */}
      {data.best_post && (
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Post</CardTitle>
            <CardDescription>
              Your highest engagement post from the analyzed data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-red-500">
                  {formatNumber(data.best_post.likes)}
                </div>
                <div className="text-xs text-muted-foreground">Likes</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-500">
                  {formatNumber(data.best_post.comments)}
                </div>
                <div className="text-xs text-muted-foreground">Comments</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-500">
                  {data.best_post.engagement_rate?.toFixed(2) || 'N/A'}%
                </div>
                <div className="text-xs text-muted-foreground">Engagement</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={onGenerateMediaKit} 
          className="flex-1" 
          variant="gradient"
          disabled={loading}
        >
          <FileText className="mr-2 h-4 w-4" />
          Generate Media Kit
        </Button>
        
        {onDownloadPDF && (
          <Button 
            onClick={onDownloadPDF} 
            variant="outline"
            disabled={loading}
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        )}
        
        <Button 
          variant="outline"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: `${data.handle}'s Engagement Analysis`,
                text: `Check out my ${data.engagement_rate.toFixed(2)}% engagement rate on ${platformConfig.name}!`,
                url: window.location.href
              })
            } else {
              navigator.clipboard.writeText(window.location.href)
            }
          }}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>

      {/* Upgrade CTA */}
      <Card className="border-dashed border-primary/50 bg-primary/5">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Want More Advanced Analytics?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upgrade to Pro for detailed audience insights, competitor analysis, and unlimited media kits.
            </p>
            <Button variant="outline" size="sm">
              Upgrade to Pro
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Add missing Badge component
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
