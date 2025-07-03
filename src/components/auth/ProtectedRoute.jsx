import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import Loading from '@/components/ui/Loading'

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, loading } = useSelector(state => state.auth)
  const location = useLocation()
  
  if (loading) {
    return <Loading />
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />
  }
  
  return children
}

export default ProtectedRoute