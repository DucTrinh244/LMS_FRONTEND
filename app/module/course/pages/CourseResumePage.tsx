import CourseCurriculum from '~/module/course/components/CourseCurriculum';
import CourseGridPage from '~/module/landing/components/courseContent';
import Footer from '~/shared/components/ui/Footer';
import Header from '~/shared/components/ui/Header';

const CourseResumePage = () => {
  return (
    <div>
      <Header />
         <main className="pt-20"> {/* Adds padding-top equal to header height (80px) */}
      <CourseCurriculum/>
      <CourseGridPage />
      </main>
    <Footer/>
    </div>
  );
};

export default CourseResumePage;