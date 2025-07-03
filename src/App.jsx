import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import store from '@/store'
import Layout from '@/components/organisms/Layout'
import Home from '@/components/pages/Home'
import CategoryPage from '@/components/pages/CategoryPage'
import ApkDetail from '@/components/pages/ApkDetail'
import SearchResults from '@/components/pages/SearchResults'
import AdminDashboard from '@/components/pages/AdminDashboard'
import Login from '@/components/pages/Login'
import Register from '@/components/pages/Register'
import Profile from '@/components/pages/Profile'
import Unauthorized from '@/components/pages/Unauthorized'
import NotFound from '@/components/pages/NotFound'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

function App() {
return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected routes with layout */}
            <Route path="/" element={
              <Layout>
                <Home />
              </Layout>
            } />
            <Route path="/category/:categorySlug" element={
              <Layout>
                <CategoryPage />
              </Layout>
            } />
            <Route path="/apk/:apkId" element={
              <Layout>
                <ApkDetail />
              </Layout>
            } />
            <Route path="/search" element={
              <Layout>
                <SearchResults />
              </Layout>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <AdminDashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="*" element={
              <Layout>
                <NotFound />
              </Layout>
            } />
          </Routes>
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
    </Provider>
  )
}

export default App