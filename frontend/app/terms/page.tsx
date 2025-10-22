import PageLayout from '@/components/layout/PageLayout'
import MotionInView from '@/components/marketing/MotionInView'

export default function TermsPage() {
  return (
    <PageLayout 
      title="Terms of Service"
      subtitle="These terms govern your use of Ifluencesa's platform and services. By using our services, you agree to be bound by these terms."
    >
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <MotionInView>
              <div className="space-y-12">
                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Acceptance of Terms</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      By accessing or using Ifluencesa's services, you agree to be bound by these Terms of Service 
                      and our Privacy Policy. If you do not agree to these terms, please do not use our services.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Description of Service</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Ifluencesa provides a platform that enables content creators to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Analyze their social media engagement and performance</li>
                      <li>Generate professional media kits</li>
                      <li>Connect with brands for partnership opportunities</li>
                      <li>Track and manage their creator business metrics</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">User Accounts</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      To use our services, you must create an account and provide accurate information. 
                      You are responsible for:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Maintaining the confidentiality of your account credentials</li>
                      <li>All activities that occur under your account</li>
                      <li>Notifying us immediately of any unauthorized use</li>
                      <li>Ensuring your account information remains current and accurate</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Acceptable Use</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>You agree not to use our services to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Violate any applicable laws or regulations</li>
                      <li>Infringe on intellectual property rights</li>
                      <li>Upload malicious code or attempt to disrupt our services</li>
                      <li>Engage in fraudulent or deceptive practices</li>
                      <li>Harass, abuse, or harm other users</li>
                      <li>Share false or misleading information about your metrics</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Content and Intellectual Property</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      You retain ownership of the content you upload to our platform. By using our services, 
                      you grant us a limited license to use your content to provide our services, including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Generating analytics and insights</li>
                      <li>Creating media kits and presentations</li>
                      <li>Facilitating brand partnerships</li>
                    </ul>
                    <p>
                      Our platform, including all software, designs, and proprietary features, 
                      remains our intellectual property.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Payment and Billing</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      For paid services:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Fees are charged in advance on a recurring basis</li>
                      <li>All fees are non-refundable except as required by law</li>
                      <li>You authorize us to charge your payment method</li>
                      <li>We may change our fees with 30 days' notice</li>
                      <li>Failure to pay may result in service suspension</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Privacy and Data</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Our collection and use of your information is governed by our Privacy Policy. 
                      By using our services, you consent to the collection and use of your information 
                      as described in our Privacy Policy.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Disclaimers</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Our services are provided "as is" without warranties of any kind. We do not guarantee:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Uninterrupted or error-free service</li>
                      <li>Accuracy of analytics or data</li>
                      <li>Success in brand partnerships</li>
                      <li>Compatibility with all devices or platforms</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Limitation of Liability</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      To the maximum extent permitted by law, Ifluencesa shall not be liable for any 
                      indirect, incidental, special, or consequential damages arising from your use 
                      of our services.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Termination</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Either party may terminate this agreement at any time. Upon termination:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Your access to our services will cease</li>
                      <li>We may delete your account and data</li>
                      <li>Outstanding fees remain due</li>
                      <li>Certain provisions will survive termination</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Changes to Terms</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      We may modify these terms at any time. We will notify users of material changes 
                      via email or through our platform. Continued use of our services after changes 
                      constitutes acceptance of the new terms.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-light mb-6">Contact Information</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      For questions about these terms, please contact us:
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p><strong>Email:</strong> legal@ifluencesa.com</p>
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
