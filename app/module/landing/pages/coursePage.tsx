import CourseGridPage from '~/module/landing/components/courseContent';
import Header from '~/shared/components/ui/Header';
import CourseGridHeader from '~/shared/components/ui/HeaderInfo';

const coursePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800" >
      <Header />
         <main className="pt-20"> {/* Adds padding-top equal to header height (80px) */}
        <CourseGridHeader 
        title="Courses"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Courses", href: "/courses" },
          { label: "List" }
        ]}/>
      <CourseGridPage />
      </main>
    </div>
  );
};

export default coursePage;