import CourseDetailContent from '~/module/landing/components/CourseDetailContent';
import Footer from '~/module/landing/components/Footer';
import Header from '~/module/landing/components/Header';

const courseDetailPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />
      <CourseDetailContent/>
        <Footer />
    </div>
  );
};

export default courseDetailPage;