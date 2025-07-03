import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'

const SearchBar = ({ className = '', placeholder = "Search APKs..." }) => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <motion.form
      onSubmit={handleSearch}
      className={`flex gap-2 ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          icon="Search"
          className="w-full"
        />
      </div>
      <Button type="submit" icon="Search" disabled={!query.trim()}>
        Search
      </Button>
    </motion.form>
  )
}

export default SearchBar