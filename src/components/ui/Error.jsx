import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ 
  message = 'Something went wrong', 
  onRetry,
  className = '' 
}) => {
  return (
    <motion.div
      className={`flex items-center justify-center py-12 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="text-center max-w-md">
        <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="AlertTriangle" className="w-8 h-8 text-red-600" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        {onRetry && (
          <Button 
            onClick={onRetry}
            icon="RefreshCw"
            className="mx-auto"
          >
            Try Again
          </Button>
        )}
      </Card>
    </motion.div>
  )
}

export default Error