import { motion } from 'framer-motion'
import CategoryCard from '@/components/molecules/CategoryCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const CategoryGrid = ({ 
  categories, 
  loading, 
  error, 
  onRetry,
  apkCounts = {},
  className = '' 
}) => {
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={onRetry} />
  if (!categories || categories.length === 0) return <Empty />

  return (
    <motion.div
      className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {categories.map((category, index) => (
        <motion.div
          key={category.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <CategoryCard 
            category={category} 
            apkCount={apkCounts[category.Id] || 0}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default CategoryGrid