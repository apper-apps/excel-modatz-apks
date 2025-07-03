import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApkGrid from '@/components/organisms/ApkGrid'
import FilterSidebar from '@/components/molecules/FilterSidebar'
import Pagination from '@/components/molecules/Pagination'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'
import { getApksByCategoryService } from '@/services/api/apksService'
import { getCategoryBySlugService } from '@/services/api/categoriesService'

const CategoryPage = () => {
  const { categorySlug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  
  const [category, setCategory] = useState(null)
  const [apks, setApks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState({
    categories: [],
    sortBy: 'newest',
    minSize: '',
    maxSize: ''
  })

  useEffect(() => {
    loadCategoryData()
  }, [categorySlug, currentPage, filters])

  const loadCategoryData = async () => {
    try {
      setLoading(true)
      setError('')

      const [categoryData, apksData] = await Promise.all([
        getCategoryBySlugService(categorySlug),
        getApksByCategoryService(categorySlug, {
          page: currentPage,
          limit: 12,
          ...filters
        })
      ])

      setCategory(categoryData)
      setApks(apksData.apks)
      setTotalPages(apksData.totalPages)
    } catch (err) {
      setError('Failed to load category data')
    } finally {
      setLoading(false)
    }
  }

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading && !category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-8 bg-gray-200 rounded-lg mb-4 shimmer" />
        <div className="h-4 bg-gray-200 rounded-lg w-1/2 mb-8 shimmer" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-white rounded-xl shadow-lg shimmer" />
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="h-64 bg-white rounded-xl shadow-lg shimmer" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error && !category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <ApperIcon name="AlertTriangle" className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h2>
          <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
          <Button onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
            <ApperIcon name="Grid3x3" className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{category?.name}</h1>
            <p className="text-gray-600">
              {apks.length} APK{apks.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>
        
        {category?.description && (
          <p className="text-gray-600 max-w-3xl">{category.description}</p>
        )}
      </motion.div>

      {/* Filters Toggle (Mobile) */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          icon={showFilters ? 'X' : 'Filter'}
          className="w-full"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <FilterSidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </div>

        {/* APK Grid */}
        <div className="lg:col-span-3">
          {/* Sort Options */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFiltersChange({ ...filters, sortBy: e.target.value })}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="downloads">Most Downloaded</option>
                <option value="views">Most Viewed</option>
                <option value="title">Alphabetical</option>
              </select>
            </div>

            {/* Active Filters */}
            <div className="flex items-center gap-2">
              {filters.categories && filters.categories.length > 0 && (
                <Badge variant="primary" size="sm">
                  {filters.categories.length} filter{filters.categories.length !== 1 ? 's' : ''}
                </Badge>
              )}
            </div>
          </div>

          {/* APK Grid */}
          <ApkGrid
            apks={apks}
            loading={loading}
            error={error}
            onRetry={loadCategoryData}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage