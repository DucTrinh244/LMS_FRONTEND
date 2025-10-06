import CourseDetailView from '~/module/course/components/CourseDetailView';
import Footer from '~/shared/components/ui/Footer';
import Header from '~/shared/components/ui/Header';

const CourseWatchPage = () => {
  return (
    <div>
      <Header />
         <main className="pt-20"> {/* Adds padding-top equal to header height (80px) */}
      <CourseDetailView/>
      </main>
      <Footer/>
    </div>
  );
};

export default CourseWatchPage;