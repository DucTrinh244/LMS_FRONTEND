import BrowseCategories from '~/module/landing/components/categoryGridContenct'
import MainLayout from '~/layouts/MainLayout'
import CourseGridHeader from '~/shared/components/ui/HeaderInfo'

const CategoryGridPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <CourseGridHeader 
          title="Danh mục khóa học"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Course Category", href: "/course/category" },
            { label: "List" }
          ]}
        />
        <BrowseCategories />
      </div>
    </MainLayout>
  )
}

export default CategoryGridPage