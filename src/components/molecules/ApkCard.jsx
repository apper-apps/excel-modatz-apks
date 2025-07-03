import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const ApkCard = ({ apk }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <Link to={`/apk/${apk.Id}`}>
      <Card className="apk-card group cursor-pointer h-full" hover>
        <div className="flex flex-col h-full">
          {/* App Icon and Basic Info */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
              {apk.icon_url ? (
                <img 
                  src={apk.icon_url} 
                  alt={apk.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              ) : (
                <ApperIcon name="Smartphone" className="w-8 h-8 text-primary-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-gray-900 truncate group-hover:text-primary-600 transition-colors">
                {apk.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">v{apk.version}</p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <ApperIcon name="Download" className="w-3 h-3" />
                  {formatNumber(apk.download_count)}
                </span>
                <span className="flex items-center gap-1">
                  <ApperIcon name="Eye" className="w-3 h-3" />
                  {formatNumber(apk.views)}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
            {apk.description}
          </p>

          {/* Mod Features */}
          {apk.mod_features && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {apk.mod_features.split(',').slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="accent" size="sm">
                    {feature.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Footer Info */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <ApperIcon name="HardDrive" className="w-3 h-3" />
              <span>{formatFileSize(apk.size)}</span>
            </div>
            <div className="text-xs text-gray-400">
              {formatDistanceToNow(new Date(apk.updated_at), { addSuffix: true })}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default ApkCard