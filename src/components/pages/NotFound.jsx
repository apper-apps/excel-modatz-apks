import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import ApperIcon from '@/components/ApperIcon'

const NotFound = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        className="flex items-center justify-center min-h-[60vh]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="FileQuestion" className="w-10 h-10 text-gray-400" />
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Page Not Found
          </h2>
          
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button icon="Home" className="w-full sm:w-auto">
                Back to Home
              </Button>
            </Link>
            <Link to="/search">
              <Button variant="outline" icon="Search" className="w-full sm:w-auto">
                Search APKs
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default NotFound