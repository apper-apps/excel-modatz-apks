import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'
import { getApkByIdService, incrementDownloadCountService } from '@/services/api/apksService'

const ApkDetail = () => {
  const { apkId } = useParams()
  const [apk, setApk] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    loadApkData()
  }, [apkId])

  const loadApkData = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getApkByIdService(parseInt(apkId))
      setApk(data)
    } catch (err) {
      setError('Failed to load APK details')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!apk.download_url) {
      toast.error('Download link not available')
      return
    }

    try {
      setDownloading(true)
      await incrementDownloadCountService(apk.Id)
      
      // Update local state
      setApk(prev => ({
        ...prev,
        download_count: prev.download_count + 1
      }))

      // Start download
      window.open(apk.download_url, '_blank')
      toast.success('Download started successfully!')
    } catch (err) {
      toast.error('Failed to start download')
    } finally {
      setDownloading(false)
    }
  }

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

  if (loading) return <Loading type="list" />
  if (error) return <Error message={error} onRetry={loadApkData} />
  if (!apk) return <Error message="APK not found" />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* APK Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="mb-8">
              <div className="flex items-start gap-6">
                {/* App Icon */}
                <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  {apk.icon_url ? (
                    <img 
                      src={apk.icon_url} 
                      alt={apk.title}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                  ) : (
                    <ApperIcon name="Smartphone" className="w-12 h-12 text-primary-600" />
                  )}
                </div>

                {/* Basic Info */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{apk.title}</h1>
                  <p className="text-lg text-gray-600 mb-4">Version {apk.version}</p>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <ApperIcon name="Download" className="w-4 h-4" />
                      {formatNumber(apk.download_count)} downloads
                    </span>
                    <span className="flex items-center gap-1">
                      <ApperIcon name="Eye" className="w-4 h-4" />
                      {formatNumber(apk.views)} views
                    </span>
                    <span className="flex items-center gap-1">
                      <ApperIcon name="Calendar" className="w-4 h-4" />
                      {formatDistanceToNow(new Date(apk.updated_at), { addSuffix: true })}
                    </span>
                  </div>

                  {/* Package Name */}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <ApperIcon name="Package" className="w-4 h-4" />
                    <span className="font-mono">{apk.package_name}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {apk.description}
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Mod Features */}
          {apk.mod_features && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Mod Features</h2>
                <div className="flex flex-wrap gap-2">
                  {apk.mod_features.split(',').map((feature, index) => (
                    <Badge key={index} variant="accent" size="md">
                      {feature.trim()}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Changelog */}
          {apk.changelog && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What's New</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {apk.changelog}
                  </p>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Screenshots */}
          {apk.screenshots && apk.screenshots.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Screenshots</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {apk.screenshots.map((screenshot, index) => (
                    <img
                      key={index}
                      src={screenshot}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Download Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Download</h3>
                
                {/* File Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">File Size</span>
                    <span className="text-sm font-medium">{formatFileSize(apk.size)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Version</span>
                    <span className="text-sm font-medium">{apk.version}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Downloads</span>
                    <span className="text-sm font-medium">{formatNumber(apk.download_count)}</span>
                  </div>
                </div>

                {/* Download Button */}
                <Button
                  variant="primary"
                  size="lg"
                  icon="Download"
                  onClick={handleDownload}
                  disabled={downloading}
                  loading={downloading}
                  className="w-full"
                >
                  {downloading ? 'Starting Download...' : 'Download APK'}
                </Button>

                {/* Warning */}
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <ApperIcon name="AlertTriangle" className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-yellow-700">
                        <strong>Warning:</strong> Install APKs only from trusted sources. 
                        Enable "Unknown Sources" in Android settings to install.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Category Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Category</h3>
                <Link to={`/category/${apk.category?.slug || 'apps'}`}>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center">
                      <ApperIcon name="Grid3x3" className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{apk.category?.name || 'Apps'}</p>
                      <p className="text-sm text-gray-500">Browse category</p>
                    </div>
                  </div>
                </Link>
              </Card>
            </motion.div>

            {/* Share Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon="Share2"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                      toast.success('Link copied to clipboard!')
                    }}
                  >
                    Copy Link
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    icon="Twitter"
                    onClick={() => {
                      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${apk.title} - ${apk.description.substring(0, 100)}...`)}&url=${encodeURIComponent(window.location.href)}`
                      window.open(url, '_blank')
                    }}
                  >
                    Tweet
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApkDetail