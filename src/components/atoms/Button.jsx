import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white hover:from-secondary-600 hover:to-secondary-700 shadow-lg hover:shadow-xl',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:border-primary-600',
    ghost: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-lg
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
        ${variants[variant]} ${sizes[size]} ${className}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${loading ? 'cursor-wait' : ''}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
      )}
      {icon && iconPosition === 'left' && !loading && (
        <ApperIcon name={icon} className="w-4 h-4" />
      )}
      {children}
      {icon && iconPosition === 'right' && !loading && (
        <ApperIcon name={icon} className="w-4 h-4" />
      )}
    </motion.button>
  )
}

export default Button