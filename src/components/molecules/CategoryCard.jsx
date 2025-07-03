import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Card from '@/components/atoms/Card'
import ApperIcon from '@/components/ApperIcon'

const CategoryCard = ({ category, apkCount = 0 }) => {
  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      'Games': 'Gamepad2',
      'Apps': 'Smartphone',
      'Tools': 'Wrench',
      'Entertainment': 'Play',
      'Social': 'Users',
      'Photography': 'Camera',
      'Music': 'Music',
      'Video': 'Video',
      'Education': 'GraduationCap',
      'Business': 'Briefcase',
      'Finance': 'DollarSign',
      'Health': 'Heart',
      'Travel': 'MapPin',
      'News': 'Newspaper',
      'Sports': 'Trophy'
    }
    return iconMap[categoryName] || 'Grid3x3'
  }

  return (
    <Link to={`/category/${category.slug}`}>
      <Card className="group cursor-pointer text-center" hover>
        <div className="flex flex-col items-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ApperIcon 
              name={getCategoryIcon(category.name)} 
              className="w-8 h-8 text-primary-600" 
            />
          </div>
          
          {/* Category Name */}
          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {category.name}
          </h3>
          
          {/* APK Count */}
          <p className="text-sm text-gray-500 mb-2">
            {apkCount} APKs
          </p>
          
          {/* Description */}
          {category.description && (
            <p className="text-xs text-gray-400 text-center line-clamp-2">
              {category.description}
            </p>
          )}
        </div>
      </Card>
    </Link>
  )
}

export default CategoryCard