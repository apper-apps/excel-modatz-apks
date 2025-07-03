import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { login, clearError } from '@/store/slices/authSlice'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { loading, error, isAuthenticated } = useSelector(state => state.auth)
  
  const from = location.state?.from?.pathname || '/'
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])
  
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!credentials.username || !credentials.password) {
      toast.error('Please fill in all fields')
      return
    }
    
    try {
      await dispatch(login(credentials)).unwrap()
      toast.success('Login successful!')
      navigate(from, { replace: true })
    } catch (error) {
      // Error handled by useEffect
    }
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-4">
              <ApperIcon name="Smartphone" className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold gradient-text">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-600">
            Sign in to your MODATZ account
          </p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Username or Email"
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              icon="User"
              placeholder="Enter your username or email"
              required
            />
            
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                icon="Lock"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                <ApperIcon name={showPassword ? 'EyeOff' : 'Eye'} className="w-5 h-5" />
              </button>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              Sign In
            </Button>
          </form>
          
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-primary-600 hover:text-primary-500 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Demo credentials: admin / admin123
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Login