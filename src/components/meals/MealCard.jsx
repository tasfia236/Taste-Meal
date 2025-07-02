import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { addFavorite, removeFavorite } from '../../slice/meals/mealSlice'
import { Link } from 'react-router-dom'

const MealCard = ({ meal }) => {
  const dispatch = useDispatch()
  const { favorites } = useSelector(state => state.meals)
  const isFavorite = favorites.find(m => m.idMeal === meal.idMeal)

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(meal.idMeal))
      toast.info('Removed from favorites')
    } else {
      dispatch(addFavorite(meal))
      toast.success('Added to favorites')
    }
  }

  return (
    <div className='group relative bg-white/60 shadow-md hover:shadow-xl backdrop-blur rounded-2xl overflow-hidden transition'>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className='w-full h-56 object-cover group-hover:scale-105 transition-transform'
      />

      <button
        onClick={toggleFavorite}
        className='top-3 right-3 absolute bg-white/80 hover:bg-red-100 shadow-md p-2 rounded-full'
      >
        {isFavorite ? (
          <FaHeart className='text-red-500' />
        ) : (
          <FaRegHeart className='text-gray-500' />
        )}
      </button>

    <Link to={`/meal/${meal.idMeal}`}>
        <div className='space-y-2 p-4'>
          <h3 className='font-semibold text-sky-900 text-lg truncate'>
            {meal.strMeal}
          </h3>
          <div className='flex justify-between text-gray-600 text-xs'>
            <span className='bg-cyan-200 px-2 py-0.5 rounded-full text-cyan-900'>
              {meal.strCategory}
            </span>
            <span className='italic'>{meal.strArea}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default MealCard
