import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = 'No APKs found',
  description = 'Try adjusting your search or filters to find what you\'re looking for.',
  action,
  className = '' 
}) => {
  return (
    <motion.div
      className={`flex items-center justify-center py-12 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="text-center max-w-md">
        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="Search" className="w-8 h-8 text-gray-400" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        
        {action && (
          <Button 
            onClick={action.onClick}
            icon={action.icon}
            className="mx-auto"
          >
            {action.label}
          </Button>
        )}
      </Card>
    </motion.div>
  )
}

export default Empty