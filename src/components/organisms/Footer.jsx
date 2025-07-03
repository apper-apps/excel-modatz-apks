import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Popular Categories': [
      { name: 'Games', href: '/category/games' },
      { name: 'Apps', href: '/category/apps' },
      { name: 'Tools', href: '/category/tools' },
      { name: 'Entertainment', href: '/category/entertainment' }
    ],
    'Quick Links': [
      { name: 'Latest APKs', href: '/latest' },
      { name: 'Most Downloaded', href: '/popular' },
      { name: 'Search', href: '/search' },
      { name: 'Admin Panel', href: '/admin' }
    ],
    'Support': [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' }
    ]
  }

  return (
    <motion.footer
      className="bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="Smartphone" className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">MODATZ</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your premium destination for modified Android applications. 
              Discover enhanced features and unlock new possibilities.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <ApperIcon name="Github" className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <ApperIcon name="Twitter" className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <ApperIcon name="Mail" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} MODATZ APKs. All rights reserved.
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/disclaimer"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer