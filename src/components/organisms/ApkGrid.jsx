import { motion } from 'framer-motion'
import ApkCard from '@/components/molecules/ApkCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const ApkGrid = ({ 
  apks, 
  loading, 
  error, 
  onRetry,
  className = '' 
}) => {
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={onRetry} />
  if (!apks || apks.length === 0) return <Empty />

  return (
    <motion.div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {apks.map((apk, index) => (
        <motion.div
          key={apk.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ApkCard apk={apk} />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default ApkGrid