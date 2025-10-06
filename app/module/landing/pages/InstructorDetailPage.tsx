import InstructorProfile from '~/module/landing/components/InstructorDetailContent';
import Header from '~/shared/components/ui/Header';
import CourseGridHeader from '~/shared/components/ui/HeaderInfo';

const InstructorDetailPage = () => {
  return (
    <div>
      <Header />
         <main className="pt-20"> {/* Adds padding-top equal to header height (80px) */}
        <CourseGridHeader 
        title="Intructors Details"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Instructor detail", href: "/instructors/detail" },
        ]}/>
      <InstructorProfile />
      </main>
    </div>
  );
};

export default InstructorDetailPage;