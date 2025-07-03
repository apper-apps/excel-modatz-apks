import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FeaturedCard from '@/components/molecules/FeaturedCard'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const FeaturedCarousel = ({ apks }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (apks.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % apks.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [apks.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % apks.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + apks.length) % apks.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  if (!apks || apks.length === 0) return null

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <FeaturedCard apk={apks[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      {apks.length > 1 && (
        <>
          {/* Previous/Next Buttons */}
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30"
            icon="ChevronLeft"
          >
            <span className="sr-only">Previous</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30"
            icon="ChevronRight"
          >
            <span className="sr-only">Next</span>
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 gap-2">
            {apks.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${index === currentIndex 
                    ? 'bg-primary-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                  }
                `}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default FeaturedCarousel