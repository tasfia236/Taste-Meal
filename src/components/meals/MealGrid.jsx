import { FaKitchenSet } from 'react-icons/fa6'
import MealCard from './MealCard'
import { useSelector } from 'react-redux'

const MealGrid = () => {
  const { meals, filteredMeals } = useSelector(state => state.meals)
  const displayedMeals = filteredMeals.length > 0 ? filteredMeals : meals

  return (
    <div className='mx-auto px-4 py-6 max-w-7xl'>
      {/* Heading */}
      <div className='mb-12 text-center'>
        <h2 className='flex justify-center items-center gap-2 font-extrabold text-sky-900 text-3xl md:text-4xl'>
          <FaKitchenSet className='text-cyan-900' />
          Meals
        </h2>
        <p className='mt-2 text-sky-800 text-base'>
          Explore our all meals this week
        </p>
      </div>

      {/* Meal Grid */}
      <div className='gap-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4'>
        {displayedMeals.map(meal => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  )
}

export default MealGrid
