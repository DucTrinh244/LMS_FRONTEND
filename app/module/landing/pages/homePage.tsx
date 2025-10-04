import CategoriesSection from '~/module/landing/components/CategoriesSection';
import CoursesSection from '~/module/landing/components/CoursesSection';
import CTASection from '~/module/landing/components/CTASection';
import FeaturesSection from '~/module/landing/components/FeaturesSection';
import Footer from '~/module/landing/components/Footer';
import Header from '~/module/landing/components/Header';
import HeroSection from '~/module/landing/components/HeroSection';

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