import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import SearchBar from '@/components/molecules/SearchBar'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: 'Home' },
    { name: 'Categories', href: '/categories', icon: 'Grid3x3' },
    { name: 'Latest', href: '/latest', icon: 'Clock' },
    { name: 'Admin', href: '/admin', icon: 'Settings' }
  ]

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Smartphone" className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">MODATZ</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActive(item.href) 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }
                `}
              >
                <ApperIcon name={item.icon} className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            icon={isMobileMenuOpen ? 'X' : 'Menu'}
          >
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-gray-200 py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                    ${isActive(item.href) 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ApperIcon name={item.icon} className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}

export default Header