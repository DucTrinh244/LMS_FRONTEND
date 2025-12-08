import ShoppingCart from '~/module/landing/components/ShooppingCart'
import MainLayout from '~/layouts/MainLayout'
import CourseGridHeader from '~/shared/components/ui/HeaderInfo'

const CartPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <CourseGridHeader 
          title="Giỏ hàng"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Cart", href: "/cart" }
          ]}
        />
        <ShoppingCart />
      </div>
    </MainLayout>
  )
}

export default CartPage