import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, BarChart3, FileText, Share2, Users, Zap, CheckCircle } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <span className="text-2xl font-bold gradient-text">Ifluencesa</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Pricing
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Login
            </Link>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-pattern py-24 lg:py-32">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              Turn Your Influence Into{' '}
              <span className="gradient-text">Professional Media Kits</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Analyze your engagement, generate stunning media kits, and win more brand partnerships 
              with data-driven insights that showcase your true influence.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg" asChild>
                <Link href="/signup">
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg" asChild>
                <Link href="/media-kit/demo">View Demo</Link>
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              No credit card required • Generate your first media kit in minutes
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Everything You Need to <span className="gradient-text">Stand Out</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Professional tools designed specifically for creators who want to turn their 
              influence into measurable business opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <BarChart3 className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 mb-3">Engagement Analytics</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Deep-dive into your performance with engagement rates, audience insights, 
                  and growth metrics that brands actually care about.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <FileText className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Media Kits</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Generate professional, branded media kits in seconds with your best content, 
                  stats, and contact information beautifully presented.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <Share2 className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 mb-3">Shareable Links</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Share your media kit with a clean, professional URL. Track views and 
                  engagement to see which brands are interested.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 mb-3">Multi-Platform Support</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Connect Instagram, TikTok, and YouTube accounts. Showcase your 
                  cross-platform influence in one unified media kit.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 mb-3">Brand Readiness Score</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Get a comprehensive score that evaluates your partnership readiness 
                  with actionable tips to improve your profile.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <FileText className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 mb-3">PDF Export</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Download professional PDF versions of your media kits for email 
                  pitches and offline presentations.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-16 text-gray-900">
            Trusted by <span className="gradient-text">1000+</span> Creators
          </h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-4">2.5x</div>
              <p className="text-lg text-gray-600">Higher response rates from brands</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-4">10min</div>
              <p className="text-lg text-gray-600">Average time to create media kit</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-4">95%</div>
              <p className="text-lg text-gray-600">Creator satisfaction rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start free, upgrade when you're ready to unlock premium features
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="bg-white border-2 border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
              <CardHeader className="pb-6">
                <CardTitle className="text-3xl font-bold text-gray-900">Free</CardTitle>
                <CardDescription className="text-lg text-gray-600">Perfect for getting started</CardDescription>
                <div className="text-4xl font-bold text-gray-900 mt-4">$0<span className="text-xl font-normal text-gray-600">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">1 media kit</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Basic engagement analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Shareable link</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Ifluencesa branding</span>
                  </li>
                </ul>
                <Button className="w-full border-gray-300 text-gray-700 hover:bg-gray-50" variant="outline" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="bg-white border-2 border-indigo-200 shadow-lg relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              </div>
              <CardHeader className="pb-6 pt-8">
                <CardTitle className="text-3xl font-bold text-gray-900">Pro</CardTitle>
                <CardDescription className="text-lg text-gray-600">For serious creators</CardDescription>
                <div className="text-4xl font-bold text-gray-900 mt-4">$19<span className="text-xl font-normal text-gray-600">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Unlimited media kits</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Advanced analytics & insights</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">PDF export</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Custom branding</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">View analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Priority support</span>
                  </li>
                </ul>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">
              Ready to <span className="gradient-text">Level Up</span> Your Creator Game?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of creators who are already using Ifluencesa to land better brand deals 
              and grow their influence.
            </p>
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg" asChild>
              <Link href="/signup">
                Create Your Media Kit <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-xl">W</span>
                </div>
                <span className="text-2xl font-bold gradient-text">Ifluencesa</span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Transform your social influence into professional media kits.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-gray-900">Product</h3>
              <ul className="space-y-3 text-gray-600">
                <li><Link href="#features" className="hover:text-gray-900 transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</Link></li>
                <li><Link href="/media-kit/demo" className="hover:text-gray-900 transition-colors">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-gray-900">Company</h3>
              <ul className="space-y-3 text-gray-600">
                <li><Link href="/about" className="hover:text-gray-900 transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-gray-900 transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-gray-900">Support</h3>
              <ul className="space-y-3 text-gray-600">
                <li><Link href="/help" className="hover:text-gray-900 transition-colors">Help Center</Link></li>
                <li><Link href="/docs" className="hover:text-gray-900 transition-colors">Documentation</Link></li>
                <li><Link href="/contact" className="hover:text-gray-900 transition-colors">Contact Support</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; 2024 Ifluencesa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
