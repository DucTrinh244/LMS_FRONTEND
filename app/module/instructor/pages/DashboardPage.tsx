import InstructorDashboard from '~/module/instructor/components/InstructorDashboard';
import Header from '~/shared/components/ui/Header';
import CourseGridHeader from '~/shared/components/ui/HeaderInfo';

const DashboardPage = () => {
  return (
    <div>
      <Header />
         <main className="pt-20"> {/* Adds padding-top equal to header height (80px) */}
        <CourseGridHeader 
        title="Dashboard"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Dashboard" }
        ]}/>
      <InstructorDashboard />
      </main>
    </div>
  );
};

export default DashboardPage;