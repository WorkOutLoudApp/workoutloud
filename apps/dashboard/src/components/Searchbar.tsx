import React, { useState } from 'react'
import { useAuth } from '@src/context/AuthProvider'
import Login from '@src/pages/login'
import Filters from './Workout/Filter'

interface SearchBarProps {
  onSearch: (searchTerm: string, filters: string[]) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<string[]>([])
  const auth = useAuth()

  const handleSearch = () => {
    onSearch(searchTerm, filters)
  }

  const handleFilterToggle = () => {
    setShowFilters(!showFilters)
  }

  const handleFilterChange = (filter: string) => {
    let updatedFilters
    if (filters.includes(filter)) {
      updatedFilters = filters.filter((f) => f !== filter)
    } else {
      updatedFilters = [...filters, filter]
    }
    setFilters(updatedFilters)
    onSearch(searchTerm, updatedFilters)
  }

  const inputStyle = "w-full rounded-md border bg-white px-4 py-2 text-indigo-500 focus:border-indigo-400 dark:focus:border-secondary-dark focus:outline-none focus:ring dark:focus:ring-2 dark:focus:ring-opacity-80 focus:ring-indigo-300 dark:focus:ring-secondary-dark focus:ring-opacity-40 dark:text-primary-variant-dark"

  return (
    <div className="flex items-center">
      {auth ? (
        <>
          <div className="mr-2 flex items-center">
            <input
              type="text"
              className={inputStyle}
              placeholder="Search for exercises"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
            />
            <button
              className="ml-2 cursor-pointer rounded bg-secondary px-2 py-1 text-xl font-bold text-white dark:text-primary-dark hover:bg-indigo-600 dark:bg-secondary-dark"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <div className="">
            <button onClick={handleFilterToggle}>
              <Filters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={() => {
                  setFilters([])
                  onSearch(searchTerm, [])
                }}
                showFilters={showFilters}
              />
            </button>
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default SearchBar
