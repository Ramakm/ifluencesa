import PremiumNavbar from '@/components/marketing/PremiumNavbar'
import PremiumHero from '@/components/marketing/PremiumHero'
import ServicesSection from '@/components/marketing/ServicesSection'
import ProjectsSection from '@/components/marketing/ProjectsSection'
import PremiumFooter from '@/components/marketing/PremiumFooter'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PremiumNavbar />

      <PremiumHero />

      <ServicesSection />

      <ProjectsSection />



      <PremiumFooter />
    </div>
  )
}
