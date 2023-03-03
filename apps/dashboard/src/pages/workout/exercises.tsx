import React, { useState } from 'react'
import SearchBar from '@src/components/Searchbar'
import { useAuth } from '@src/context/AuthProvider'
import Login from '../login'
import { searchExercises } from './exerciseAPI'
import { Exercise } from '@src/types/Workout'
import { useForm } from 'react-hook-form'
import SearchExercisesModal from '@src/components/Workout/Exercises/SearchExerciseModal'

interface ExerciseSearch {
  name: string
  description: string
  target: string
  equipment: string
  bodyPart: string
  gifUrl: string
}

interface Props {
  onAdd?: (exercise: Exercise) => void
}

const Exercises: React.FC<Props> = ({ onAdd }) => {
  const [searchResults, setSearchResults] = useState<ExerciseSearch[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [resultsPerPage, setResultsPerPage] = useState<number>(15)
  const { auth } = useAuth()

  const handleSearch = async (searchTerm: string, filters: string[]) => {
    try {
      const data = await searchExercises(searchTerm)
      const filteredData = data.filter((exercise: ExerciseSearch) => {
        const { name, target, equipment, bodyPart } = exercise
        const searchTerms = searchTerm.toLowerCase().split(' ')
        return (
          searchTerms.every((term) =>
            [name, target, equipment, bodyPart].some((field) =>
              field.toLowerCase().includes(term)
            )
          ) &&
          filters.every((filter) =>
            [target, equipment, bodyPart].some((field) =>
              field.toLowerCase().includes(filter.toLowerCase())
            )
          )
        )
      })
      setSearchResults(filteredData)
      setCurrentPage(1)
    } catch (error) {
      console.error(error)
    }
  }

  const handlePageChange = (pageNumber: number) => {
    return () => setCurrentPage(pageNumber)
  }

  const indexOfLastResult = currentPage * resultsPerPage
  const indexOfFirstResult = indexOfLastResult - resultsPerPage
  const currentResults = searchResults.slice(
    indexOfFirstResult,
    indexOfLastResult
  )

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(searchResults.length / resultsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="container mx-auto">
      {auth ? (
        <>
          <h1 className="mb-8 text-center text-4xl font-bold">
            Exercise Search
          </h1>
          <SearchBar onSearch={handleSearch} />
          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentResults.map((result) => (
              <li
                key={result.name}
                className="flex flex-col items-center rounded-md border p-4 shadow-sm transition duration-200 hover:shadow-lg"
              >
                <h3 className="mb-2 text-lg font-bold">{result.name}</h3>
                <img
                  src={result.gifUrl}
                  alt={`GIF of ${result.name} exercise`}
                  className="mx-auto mb-4"
                  style={{ maxWidth: '200px', maxHeight: '200px' }}
                />
                <p className="mb-2 text-center">{result.description}</p>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-gray-600">Target:</span>
                  <p className="mb-2">{result.target}</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-gray-600">
                    Equipment:
                  </span>
                  <p className="mb-2">{result.equipment}</p>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    onAdd(result)
                  }}
                >
                  <button
                    type="submit"
                    className="mt-4 rounded border border-gray-400 bg-gray-100 py-2 px-4 font-semibold text-gray-700 shadow"
                  >
                    Add to routine
                  </button>
                </form>
              </li>
            ))}
          </ul>
          {searchResults.length > resultsPerPage && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded border border-gray-400 bg-gray-100 py-2 px-4 font-semibold text-gray-700 shadow"
              >
                Prev
              </button>
              <div className="mx-4 font-semibold text-gray-700">
                {currentPage}
              </div>
              <button
                onClick={handlePageChange(currentPage + 1)}
                disabled={indexOfLastResult >= searchResults.length}
                className="rounded border border-gray-400 bg-gray-100 py-2 px-4 font-semibold text-gray-700 shadow"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default Exercises
