import PageLayout from '@/components/layout/PageLayout'
import MotionInView from '@/components/marketing/MotionInView'

export default function CookiesPage() {
  return (
    <PageLayout 
      title="Cookie Policy"
      subtitle="This policy explains how Ifluencesa uses cookies and similar technologies to enhance your experience on our platform."
    >
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <MotionInView>
              <div className="space-y-12">
                <div>
                  <h2 className="font-display text-2xl font-light mb-6">What Are Cookies</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Cookies are small text files that are stored on your device when you visit our website. 
                      They help us provide you with a better experience by remembering your preferences, 
                      analyzing how you use our site, and personalizing content.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Types of Cookies We Use</h2>
                  <div className="space-y-6 text-muted-foreground leading-relaxed">
                    <div>
                      <h3 className="font-medium text-foreground mb-3">Essential Cookies</h3>
                      <p>
                        These cookies are necessary for the website to function properly. They enable basic 
                        functions like page navigation, access to secure areas, and authentication. 
                        The website cannot function properly without these cookies.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-foreground mb-3">Analytics Cookies</h3>
                      <p>
                        We use analytics cookies to understand how visitors interact with our website. 
                        This helps us improve our services and user experience. These cookies collect 
                        information anonymously and report website trends.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-foreground mb-3">Functionality Cookies</h3>
                      <p>
                        These cookies allow the website to remember choices you make and provide enhanced, 
                        more personal features. They may be set by us or by third-party providers whose 
                        services we have added to our pages.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-foreground mb-3">Marketing Cookies</h3>
                      <p>
                        These cookies track your online activity to help advertisers deliver more relevant 
                        advertising or to limit how many times you see an ad. We may share this information 
                        with other organizations or advertisers.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Third-Party Cookies</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      We may use third-party services that also set cookies on your device. These include:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Google Analytics for website analytics</li>
                      <li>Social media platforms for sharing and integration</li>
                      <li>Customer support tools for live chat functionality</li>
                      <li>Payment processors for secure transactions</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Managing Your Cookie Preferences</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      You can control and manage cookies in several ways:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use our cookie consent banner to adjust your preferences</li>
                      <li>Modify your browser settings to block or delete cookies</li>
                      <li>Use browser extensions that manage cookie preferences</li>
                      <li>Opt out of specific third-party tracking services</li>
                    </ul>
                    <p>
                      Please note that blocking certain cookies may impact your experience on our website 
                      and limit the functionality of some features.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Cookie Retention</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Different cookies have different retention periods:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
                      <li><strong>Persistent cookies:</strong> Remain on your device for a set period or until manually deleted</li>
                      <li><strong>Analytics cookies:</strong> Typically retained for 24 months</li>
                      <li><strong>Marketing cookies:</strong> Retention periods vary by provider</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Updates to This Policy</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      We may update this cookie policy from time to time to reflect changes in our practices 
                      or for other operational, legal, or regulatory reasons. We will notify you of any 
                      material changes by posting the updated policy on this page.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Contact Us</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      If you have any questions about our use of cookies, please contact us:
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p><strong>Email:</strong> privacy@ifluencesa.com</p>
                      <p><strong>Address:</strong> Ifluencesa Inc., 123 Creator Street, San Francisco, CA 94105</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-8">
                  <p className="text-sm text-muted-foreground">
                    <strong>Last Updated:</strong> December 15, 2024
                  </p>
                </div>
              </div>
            </MotionInView>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
