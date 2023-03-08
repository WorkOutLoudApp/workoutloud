import React, { useState, useRef, useEffect } from 'react'
import { BsFilter } from 'react-icons/bs'

interface FiltersProps {
  filters: string[]
  onFilterChange: (filter: string) => void
  onClearFilters: () => void
  showFilters: boolean
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const filterGroups = [
    {
      name: 'All',
      filters: [],
    },
    {
      name: 'Body Parts',
      filters: [
        'back',
        'cardio',
        'chest',
        'lower arms',
        'lower legs',
        'neck',
        'shoulders',
        'upper arms',
        'upper legs',
        'waist',
      ],
    },
    {
      name: 'Target Muscles',
      filters: [
        'abductors',
        'abs',
        'adductors',
        'biceps',
        'calves',
        'cardio vascular',
        'delts',
        'forearms',
        'glutes',
        'hamstrings',
        'lats',
        'levator scapulae',
        'pectorals',
        'quads',
        'serratus anterior',
        'spine',
        'traps',
        'triceps',
        'upper back',
      ],
    },
    {
      name: 'Equipment',
      filters: [
        'assisted',
        'band',
        'barbell',
        'body weight',
        'bosu ball',
        'cable',
        'dumbbell',
        'elliptical machine',
        'ez barbell',
        'hammer',
        'kettlebell',
        'leverage machine',
        'medicine ball',
        'olympic barbell',
        'resistance band',
        'roller',
        'rope',
        'skierg machine',
        'sled machine',
        'smith machine',
        'stability ball',
        'stationary bike',
        'stepmill machine',
        'tire',
        'trap bar',
        'upper body ergometer',
        'weighted',
        'wheel roller',
      ],
    },
  ]
  const filterRef = useRef<HTMLDivElement>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(filterGroups[0].name)

  const handleFilterToggle = () => setShowFilters(!showFilters)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false)
      }
    }
    if (showFilters) {
      document.addEventListener('mousedown', handleOutsideClick)
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [showFilters])

  const typeSelection = filterGroups.map((group) => group.name)

  const renderFilters = (groupName: string) => {
    if (groupName === 'All') {
      return filterGroups.map((group) =>
        group.filters.map((filter) => (
          <label key={filter} className="mt-3 inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-indigo-600"
              checked={filters.includes(filter)}
              onChange={() => onFilterChange(filter)}
            />
            <span className="ml-2 text-gray-700">{filter}</span>
          </label>
        ))
      )
    } else {
      const filterGroup = filterGroups.find((group) => group.name === groupName)
      if (filterGroup) {
        return filterGroup.filters.map((filter) => (
          <label key={filter} className="mt-3 inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-indigo-600"
              checked={filters.includes(filter)}
              onChange={() => onFilterChange(filter)}
            />
            <span className="ml-2 text-gray-700">{filter}</span>
          </label>
        ))
      } else {
        return null
      }
    }
  }

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-end">
        <button
          className="font['Poppins',San-serif] cursor-pointer rounded bg-indigo-500 px-2 py-1 text-xl font-bold text-white hover:bg-indigo-600"
          onClick={handleFilterToggle}
        >
          <BsFilter />
        </button>
        {showFilters && (
          <div
            ref={filterRef}
            className="fixed right-0 top-0 z-20 h-full w-80 overflow-y-auto bg-white shadow-lg"
          >
            <div className="p-4">
              <h3 className="mb-2 font-semibold text-gray-700 underline">
                Type Selection
              </h3>
              <ul>
                {typeSelection.map((group) => (
                  <li key={group}>
                    <button
                      className="block w-full py-2 px-4 text-left hover:bg-gray-100"
                      onClick={() => setSelectedGroup(group)}
                    >
                      {group}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t p-4">
              <h3 className="mb-2 font-semibold text-gray-700 underline">
                {selectedGroup}
              </h3>
              <div className="grid grid-cols-3 gap-5">
                {renderFilters(selectedGroup)}
              </div>
            </div>
            <div className="border-t p-4">
              <button
                className="font['Poppins',San-serif] cursor-pointer rounded bg-indigo-500 px-2 py-1 text-xl font-bold text-white hover:bg-indigo-600"
                onClick={onClearFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Filters
