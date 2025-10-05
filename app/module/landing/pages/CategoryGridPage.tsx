import BrowseCategories from '~/module/landing/components/categoryGridContenct';
import Header from '~/module/landing/components/Header';
import CourseGridHeader from '~/shared/components/ui/HeaderInfo';

const coursePage = () => {
  return (
    <div>
      <Header />
         <main className="pt-20"> {/* Adds padding-top equal to header height (80px) */}
        <CourseGridHeader 
        title="Course Categor"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Course Category", href: "/courses" },
          { label: "List" }
        ]}/>
      < BrowseCategories/>
      </main>
    </div>
  );
};

export default coursePage;