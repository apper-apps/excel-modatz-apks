import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className = '' 
}) => {
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }
    
    return pages
  }

  if (totalPages <= 1) return null

  return (
    <motion.div
      className={`flex items-center justify-center gap-2 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Previous Button */}
      <Button
        variant="outline"
        icon="ChevronLeft"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3"
      >
        Previous
      </Button>

      {/* Page Numbers */}
      <div className="flex gap-1">
        {getPageNumbers().map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-gray-400">...</span>
            ) : (
              <Button
                variant={currentPage === page ? 'primary' : 'ghost'}
                onClick={() => onPageChange(page)}
                className="px-3 py-2 min-w-[40px]"
              >
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        icon="ChevronRight"
        iconPosition="right"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3"
      >
        Next
      </Button>
    </motion.div>
  )
}

export default Pagination