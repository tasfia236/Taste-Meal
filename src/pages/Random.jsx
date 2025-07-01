import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRandomMeal } from '../data/meals/mealSlice'
import MealCard from '../components/MealCard'
import { FaDice } from 'react-icons/fa'

const Random = () => {
  const dispatch = useDispatch()
  const { meal, status } = useSelector(state => state.meals)
  console.log(meal)
  useEffect(() => {
    dispatch(fetchRandomMeal(''))
  }, [dispatch])

  return (
    <div className='bg-white shadow mx-auto p-4 md:p-6 rounded w-full max-w-4xl'>
      <h2 className='flex justify-center items-center gap-2 mb-6 font-bold text-[#7c1d1d] text-xl md:text-2xl text-center ext-2xl'>
        <FaDice />
        Random Meal
      </h2>

      {status === 'loading' && (
        <p className='text-gray-600 text-center'>Loading random meal...</p>
      )}

      {meal && (
        <div className='flex md:flex-row flex-col gap-6'>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className='shadow rounded-lg w-full md:w-1/2'
          />
          <div className='flex-1'>
            <h3 className='mb-2 font-semibold text-lg'>{meal.strMeal}</h3>
            <p className='mb-2 text-gray-600 text-sm'>
              <strong>Category:</strong> {meal.strCategory} <br />
              <strong>Area:</strong> {meal.strArea}
            </p>
            <p className='mb-3 text-gray-800 text-sm'>
              <strong>Instructions:</strong>{' '}
              {meal.strInstructions?.slice(0, 250)}...
            </p>
            <a
              href={meal.strYoutube}
              target='_blank'
              rel='noreferrer'
              className='inline-block bg-[#7c1d1d] hover:bg-yellow-500 mt-2 px-4 py-2 rounded text-white transition'
            >
              Watch Recipe Video
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Random
