import CategoriesSection from '~/module/landing/components/CategoriesSection';
import CoursesSection from '~/module/landing/components/CoursesSection';
import CTASection from '~/module/landing/components/CTASection';
import FeaturesSection from '~/module/landing/components/FeaturesSection';
import HeroSection from '~/module/landing/components/HeroSection';
import Footer from '~/shared/components/ui/Footer';
import Header from '~/shared/components/ui/Header';

const homePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <CoursesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default homePage;