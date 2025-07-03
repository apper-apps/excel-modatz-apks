import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const FeaturedCard = ({ apk }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <motion.div
      className="featured-card rounded-2xl p-8 text-white relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12" />
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* App Icon */}
        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
          {apk.icon_url ? (
            <img 
              src={apk.icon_url} 
              alt={apk.title}
              className="w-16 h-16 rounded-xl object-cover"
            />
          ) : (
            <ApperIcon name="Smartphone" className="w-12 h-12 text-white" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <Badge variant="accent" size="sm" className="mb-3">
            Featured
          </Badge>
          <h3 className="text-2xl font-bold mb-2">{apk.title}</h3>
          <p className="text-white/90 mb-4 text-sm">
            {apk.description.length > 150 
              ? apk.description.substring(0, 150) + '...' 
              : apk.description
            }
          </p>
          
          {/* Stats */}
          <div className="flex items-center gap-4 mb-4 text-sm">
            <span className="flex items-center gap-1">
              <ApperIcon name="Download" className="w-4 h-4" />
              {formatNumber(apk.download_count)} downloads
            </span>
            <span className="flex items-center gap-1">
              <ApperIcon name="Star" className="w-4 h-4" />
              v{apk.version}
            </span>
          </div>

          {/* Mod Features */}
          {apk.mod_features && (
            <div className="flex flex-wrap gap-2 mb-4">
              {apk.mod_features.split(',').slice(0, 3).map((feature, index) => (
                <span key={index} className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                  {feature.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Action Button */}
          <Link to={`/apk/${apk.Id}`}>
            <Button 
              variant="accent" 
              icon="Download" 
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30"
            >
              Download Now
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default FeaturedCard