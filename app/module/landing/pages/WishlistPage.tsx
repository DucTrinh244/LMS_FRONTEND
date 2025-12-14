import WishlistContent from '~/module/landing/components/WishlistContent'
import MainLayout from '~/layouts/MainLayout'
import CourseGridHeader from '~/shared/components/ui/HeaderInfo'

const WishlistPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <CourseGridHeader 
          title="Wishlist"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Wishlist", href: "/wishlist" }
          ]}
        />
        <WishlistContent />
      </div>
    </MainLayout>
  )
}

export default WishlistPage

