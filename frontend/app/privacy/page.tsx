import PageLayout from '@/components/layout/PageLayout'
import MotionInView from '@/components/marketing/MotionInView'

export default function PrivacyPage() {
  return (
    <PageLayout 
      title="Privacy Policy"
      subtitle="Your privacy is important to us. This policy explains how we collect, use, and protect your information when you use Ifluencesa's services."
    >
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <MotionInView>
              <div className="space-y-12">
                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Information We Collect</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      We collect information you provide directly to us, such as when you create an account, 
                      connect your social media profiles, or contact us for support. This includes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Account information (name, email, password)</li>
                      <li>Social media profile data and analytics</li>
                      <li>Content and media you choose to include in your media kits</li>
                      <li>Communication preferences and settings</li>
                      <li>Payment and billing information</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">How We Use Your Information</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Provide, maintain, and improve our services</li>
                      <li>Generate analytics and insights for your media kits</li>
                      <li>Facilitate brand partnerships and collaborations</li>
                      <li>Send you technical notices and support messages</li>
                      <li>Respond to your comments and questions</li>
                      <li>Protect against fraud and abuse</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Information Sharing</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      We do not sell, trade, or rent your personal information to third parties. 
                      We may share your information in the following circumstances:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>With brands and agencies when you choose to share your media kit</li>
                      <li>With service providers who assist in our operations</li>
                      <li>When required by law or to protect our rights</li>
                      <li>In connection with a merger, acquisition, or sale of assets</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Data Security</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      We implement appropriate security measures to protect your personal information 
                      against unauthorized access, alteration, disclosure, or destruction. This includes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Encryption of data in transit and at rest</li>
                      <li>Regular security audits and assessments</li>
                      <li>Access controls and authentication measures</li>
                      <li>Employee training on data protection practices</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Your Rights</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>You have the right to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Access and update your personal information</li>
                      <li>Delete your account and associated data</li>
                      <li>Opt out of marketing communications</li>
                      <li>Request a copy of your data</li>
                      <li>Restrict or object to certain processing activities</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Cookies and Tracking</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      We use cookies and similar technologies to enhance your experience, analyze usage, 
                      and provide personalized content. You can control cookie settings through your 
                      browser preferences.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Changes to This Policy</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      We may update this privacy policy from time to time. We will notify you of any 
                      material changes by posting the new policy on this page and updating the 
                      "Last Updated" date.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Contact Us</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      If you have any questions about this privacy policy or our data practices, 
                      please contact us at:
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
