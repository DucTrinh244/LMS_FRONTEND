import Header from '~/shared/components/ui/Header'
import Footer from '~/shared/components/ui/Footer'

interface MainLayoutProps {
  children: React.ReactNode
}

/**
 * MainLayout - Layout cho các trang công khai
 * Bao gồm: Header, Main Content, Footer
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 pt-20">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default MainLayout
