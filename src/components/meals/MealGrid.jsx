import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import MealCard from './MealCard'
import { useState } from 'react'

const MealGrid = ({ meals }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const mealsPerPage = 8
  const totalPages = Math.ceil(meals.length / mealsPerPage)

  const indexOfLast = currentPage * mealsPerPage
  const indexOfFirst = indexOfLast - mealsPerPage
  const currentMeals = meals.slice(indexOfFirst, indexOfLast)

  const handlePageChange = page => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  return (
    <div className='mx-auto px-4 py-6 max-w-7xl'>
      <div
        id='explore'
        className='gap-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4'
      >
        {currentMeals.map(meal => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex justify-center space-x-2 mt-6'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='flex justify-center items-center gap-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 px-3 py-1 rounded'
          >
            <FaArrowCircleLeft /> Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-red-800 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='flex justify-center items-center gap-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 px-3 py-1 rounded'
          >
            Next <FaArrowCircleRight />
          </button>
        </div>
      )}
    </div>
  )
}

export default MealGrid
