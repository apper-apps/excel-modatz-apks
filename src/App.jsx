import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import Home from '@/components/pages/Home'
import CategoryPage from '@/components/pages/CategoryPage'
import ApkDetail from '@/components/pages/ApkDetail'
import SearchResults from '@/components/pages/SearchResults'
import AdminDashboard from '@/components/pages/AdminDashboard'
import NotFound from '@/components/pages/NotFound'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categorySlug" element={<CategoryPage />} />
            <Route path="/apk/:apkId" element={<ApkDetail />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="z-50"
        />
      </div>
    </Router>
  )
}

export default App