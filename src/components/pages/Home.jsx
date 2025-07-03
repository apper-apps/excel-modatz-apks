import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import FeaturedCarousel from '@/components/organisms/FeaturedCarousel'
import ApkGrid from '@/components/organisms/ApkGrid'
import CategoryGrid from '@/components/organisms/CategoryGrid'
import Button from '@/components/atoms/Button'
import { getApksService } from '@/services/api/apksService'
import { getCategoriesService } from '@/services/api/categoriesService'

const Home = () => {
  const [featuredApks, setFeaturedApks] = useState([])
  const [latestApks, setLatestApks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadHomeData()
  }, [])

  const loadHomeData = async () => {
    try {
      setLoading(true)
      setError('')

      const [apksData, categoriesData] = await Promise.all([
        getApksService(),
        getCategoriesService()
      ])

      // Get featured APKs (top downloaded)
      const featured = apksData
        .sort((a, b) => b.download_count - a.download_count)
        .slice(0, 5)
      setFeaturedApks(featured)

      // Get latest APKs
      const latest = apksData
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 8)
      setLatestApks(latest)

      setCategories(categoriesData.slice(0, 10))
    } catch (err) {
      setError('Failed to load home data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          Premium <span className="gradient-text">Modified</span> APKs
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover enhanced Android applications with premium features unlocked. 
          Browse our curated collection of modified APKs with detailed information and secure downloads.
        </p>
      </motion.div>

      {/* Featured APKs Carousel */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured APKs</h2>
        <FeaturedCarousel apks={featuredApks} />
      </motion.section>

      {/* Categories */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Browse Categories</h2>
          <Link to="/categories">
            <Button variant="outline" icon="ArrowRight" iconPosition="right">
              View All
            </Button>
          </Link>
        </div>
        <CategoryGrid 
          categories={categories}
          loading={loading}
          error={error}
          onRetry={loadHomeData}
        />
      </motion.section>

      {/* Latest APKs */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest Uploads</h2>
          <Link to="/latest">
            <Button variant="outline" icon="ArrowRight" iconPosition="right">
              View All
            </Button>
          </Link>
        </div>
        <ApkGrid 
          apks={latestApks}
          loading={loading}
          error={error}
          onRetry={loadHomeData}
        />
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">1000+</div>
            <div className="text-white/80">APK Files</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">50K+</div>
            <div className="text-white/80">Downloads</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">15+</div>
            <div className="text-white/80">Categories</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-white/80">Support</div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Home