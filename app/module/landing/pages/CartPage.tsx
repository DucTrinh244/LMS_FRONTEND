import ShoppingCart from '~/module/landing/components/ShooppingCart';
import Header from '~/shared/components/ui/Header';
import CourseGridHeader from '~/shared/components/ui/HeaderInfo';

const CartPage = () => {
  return (
    <div>
      <Header />
         <main className="pt-20"> {/* Adds padding-top equal to header height (80px) */}
        <CourseGridHeader 
        title="Cart Course"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "List" }
        ]}/>
      < ShoppingCart/>
      </main>
    </div>
  );
};

export default CartPage;