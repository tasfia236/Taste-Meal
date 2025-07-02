import { useSelector } from 'react-redux'
import { useState } from 'react'
import MealCard from './MealCard'

const MealGrid = ({ isFavoritePage = false }) => {
  const { meals, filteredMeals, favorites } = useSelector(state => state.meals)

  const displayedMeals = isFavoritePage
    ? favorites
    : filteredMeals.length > 0
    ? filteredMeals
    : meals

  // Pagination logic
  const itemsPerPage = 8
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(displayedMeals.length / itemsPerPage)

  const paginatedMeals = displayedMeals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = page => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className='mx-auto px-4 py-6 max-w-7xl'>
      {/* Grid of Meals */}
      <div className='gap-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4'>
        {paginatedMeals.length > 0 ? (
          paginatedMeals.map(meal => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))
        ) : (
          <p className='col-span-full text-gray-500 text-center'>
            No meals found.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className='flex justify-center items-center gap-2 mt-8'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='hover:bg-sky-100 disabled:opacity-50 px-3 py-1 border rounded-md text-gray-700 text-sm'
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded-md text-sm ${
                currentPage === index + 1
                  ? 'bg-sky-500 text-white'
                  : 'border text-gray-700 hover:bg-sky-100'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='hover:bg-sky-100 disabled:opacity-50 px-3 py-1 border rounded-md text-gray-700 text-sm'
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default MealGrid
