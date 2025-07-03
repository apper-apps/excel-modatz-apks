import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <ApperIcon name="ShieldX" className="w-10 h-10 text-red-600" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Access Denied
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        
        <div className="space-y-4">
          <Link to="/">
            <Button variant="primary" size="lg" className="w-full">
              Go to Home
            </Button>
          </Link>
          
          <Link to="/login">
            <Button variant="outline" size="lg" className="w-full">
              Sign In with Different Account
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default Unauthorized