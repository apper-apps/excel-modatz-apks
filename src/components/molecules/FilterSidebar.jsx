import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import ApperIcon from '@/components/ApperIcon'
import { getCategoriesService } from '@/services/api/categoriesService'

const FilterSidebar = ({ 
  filters, 
  onFiltersChange,
  className = '' 
}) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      setLoading(true)
      const data = await getCategoriesService()
      setCategories(data)
    } catch (error) {
      console.error('Error loading categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const handleCategoryToggle = (categoryId) => {
    const currentCategories = filters.categories || []
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter(id => id !== categoryId)
      : [...currentCategories, categoryId]
    
    handleFilterChange('categories', newCategories)
  }

  const clearFilters = () => {
    onFiltersChange({
      categories: [],
      sortBy: 'newest',
      minSize: '',
      maxSize: ''
    })
  }

  const hasActiveFilters = () => {
    return (filters.categories && filters.categories.length > 0) ||
           filters.minSize || filters.maxSize
  }

  return (
    <motion.div
      className={`space-y-6 ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters() && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            icon="X"
          >
            Clear
          </Button>
        )}
      </div>

      {/* Categories */}
      <Card>
        <h4 className="font-medium text-gray-900 mb-4">Categories</h4>
        <div className="space-y-2">
          {loading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            categories.map((category) => (
              <label key={category.Id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories?.includes(category.Id) || false}
                  onChange={() => handleCategoryToggle(category.Id)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{category.name}</span>
              </label>
            ))
          )}
        </div>
      </Card>

      {/* Sort By */}
      <Card>
        <h4 className="font-medium text-gray-900 mb-4">Sort By</h4>
        <div className="space-y-2">
          {[
            { value: 'newest', label: 'Newest First' },
            { value: 'downloads', label: 'Most Downloaded' },
            { value: 'views', label: 'Most Viewed' },
            { value: 'title', label: 'Alphabetical' }
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sortBy"
                value={option.value}
                checked={filters.sortBy === option.value}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </Card>

      {/* File Size Range */}
      <Card>
        <h4 className="font-medium text-gray-900 mb-4">File Size (MB)</h4>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Min</label>
              <input
                type="number"
                placeholder="0"
                value={filters.minSize || ''}
                onChange={(e) => handleFilterChange('minSize', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Max</label>
              <input
                type="number"
                placeholder="1000"
                value={filters.maxSize || ''}
                onChange={(e) => handleFilterChange('maxSize', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: '< 10MB', min: '', max: '10' },
              { label: '10-50MB', min: '10', max: '50' },
              { label: '50-100MB', min: '50', max: '100' },
              { label: '> 100MB', min: '100', max: '' }
            ].map((preset) => (
              <Button
                key={preset.label}
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleFilterChange('minSize', preset.min)
                  handleFilterChange('maxSize', preset.max)
                }}
                className="text-xs"
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default FilterSidebar