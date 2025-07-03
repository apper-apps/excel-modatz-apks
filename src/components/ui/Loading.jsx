import { motion } from 'framer-motion'

const Loading = ({ type = 'grid' }) => {
  if (type === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl p-4 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {/* App Icon and Info */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl shimmer" />
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded-lg mb-2 shimmer" />
                <div className="h-4 bg-gray-200 rounded-lg w-1/2 mb-2 shimmer" />
                <div className="flex gap-2">
                  <div className="h-3 bg-gray-200 rounded w-16 shimmer" />
                  <div className="h-3 bg-gray-200 rounded w-16 shimmer" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded-lg shimmer" />
              <div className="h-4 bg-gray-200 rounded-lg shimmer" />
              <div className="h-4 bg-gray-200 rounded-lg w-3/4 shimmer" />
            </div>

            {/* Tags */}
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-gray-200 rounded-full w-16 shimmer" />
              <div className="h-6 bg-gray-200 rounded-full w-20 shimmer" />
              <div className="h-6 bg-gray-200 rounded-full w-14 shimmer" />
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="h-4 bg-gray-200 rounded w-20 shimmer" />
              <div className="h-4 bg-gray-200 rounded w-16 shimmer" />
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (type === 'list') {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl shimmer" />
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded-lg mb-2 shimmer" />
                <div className="h-4 bg-gray-200 rounded-lg w-1/3 mb-3 shimmer" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded-lg shimmer" />
                  <div className="h-4 bg-gray-200 rounded-lg shimmer" />
                  <div className="h-4 bg-gray-200 rounded-lg w-2/3 shimmer" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  // Default spinner
  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        className="w-12 h-12 border-4 border-gray-200 border-t-primary-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

export default Loading