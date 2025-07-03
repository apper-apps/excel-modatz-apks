import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '',
  hover = true,
  padding = 'default',
  ...props 
}) => {
  const paddings = {
    none: '',
    sm: 'p-3',
    default: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -2 } : {}}
      className={`
        bg-white rounded-xl shadow-lg border border-gray-100
        transition-all duration-300
        ${hover ? 'hover:shadow-xl hover:border-gray-200' : ''}
        ${paddings[padding]} ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card