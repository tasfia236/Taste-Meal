import { useSelector } from 'react-redux'
import MealCard from './MealCard'

const MealGrid = ({ isFavoritePage = false }) => {
  const { meals, filteredMeals, favorites } = useSelector(state => state.meals)

  const displayedMeals = isFavoritePage
    ? favorites
    : filteredMeals.length > 0
    ? filteredMeals
    : meals

  return (
    <div className='mx-auto px-4 py-6 max-w-7xl'>
      <div className='gap-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4'>
        {displayedMeals.length > 0 ? (
          displayedMeals.map(meal => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))
        ) : (
          <p className='col-span-full text-gray-500 text-center'>
            No meals found.
          </p>
        )}
      </div>
    </div>
  )
}

export default MealGrid
