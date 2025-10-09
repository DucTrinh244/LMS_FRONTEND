import DashboardHeroInstructor from '~/module/instructor/components/DashboardHero';
import InstructorDashboard from '~/module/instructor/components/InstructorDashboard';
import Header from '~/shared/components/ui/Header';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />
      <main className="pt-20"> {/* Adds padding-top equal to header height (80px) */}
        <DashboardHeroInstructor/>
        <InstructorDashboard />
      </main>
    </div>
  );
};

export default DashboardPage;