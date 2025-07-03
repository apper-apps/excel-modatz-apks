import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApkGrid from '@/components/organisms/ApkGrid'
import FilterSidebar from '@/components/molecules/FilterSidebar'
import Pagination from '@/components/molecules/Pagination'
import SearchBar from '@/components/molecules/SearchBar'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'
import { searchApksService } from '@/services/api/apksService'

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const [apks, setApks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState({
    categories: [],
    sortBy: 'relevance',
    minSize: '',
    maxSize: ''
  })

  useEffect(() => {
    if (query) {
      searchApks()
    }
  }, [query, currentPage, filters])

  const searchApks = async () => {
    try {
      setLoading(true)
      setError('')

      const results = await searchApksService(query, {
        page: currentPage,
        limit: 12,
        ...filters
      })

      setApks(results.apks)
      setTotalPages(results.totalPages)
      setTotalResults(results.total)
    } catch (err) {
      setError('Failed to search APKs')
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

  if (!query) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Search" className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Search APKs</h2>
          <p className="text-gray-600 mb-6">Enter a search term to find APKs</p>
          <div className="max-w-md mx-auto">
            <SearchBar />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <ApperIcon name="Search" className="w-6 h-6 text-gray-400" />
          <h1 className="text-3xl font-bold text-gray-900">
            Search Results for "{query}"
          </h1>
        </div>
        <p className="text-gray-600">
          {totalResults} result{totalResults !== 1 ? 's' : ''} found
        </p>
      </motion.div>

      {/* New Search */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <SearchBar placeholder="Search for APKs..." />
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

        {/* Results */}
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
                <option value="relevance">Relevance</option>
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

          {/* Results Grid */}
          <ApkGrid
            apks={apks}
            loading={loading}
            error={error}
            onRetry={searchApks}
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

export default SearchResults