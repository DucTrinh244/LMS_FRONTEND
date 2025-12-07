import CategoriesSection from '~/module/landing/components/CategoriesSection'
import CoursesSection from '~/module/landing/components/CoursesSection'
import CTASection from '~/module/landing/components/CTASection'
import FeaturesSection from '~/module/landing/components/FeaturesSection'
import HeroSection from '~/module/landing/components/HeroSection'
import MainLayout from '~/layouts/MainLayout'

const HomePage = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <CoursesSection />
      <CTASection />
    </MainLayout>
  )
}

export default HomePage