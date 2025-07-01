import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from '../data/meals/mealSlice'
import { toast } from 'react-toastify'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

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
    <div className='group relative bg-white shadow-md hover:shadow-2xl rounded-2xl overflow-hidden transition-all animate-fade-in-up duration-300'>
      {/* Image Block */}
      <div className='relative h-56 overflow-hidden'>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className='w-full h-full object-cover group-hover:scale-105 transition duration-500 transform'
        />

        {/* Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className='top-3 right-3 absolute bg-black/50 hover:bg-red-500 p-2 rounded-full text-white text-xl transition'
          title='Toggle Favorite'
        >
          {isFavorite ? (
            <FaHeart className='text-yellow-400' />
          ) : (
            <FaRegHeart className='text-white' />
          )}
        </button>
      </div>
      <a
        href={`https://www.themealdb.com/meal/${meal.idMeal}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        {/* Info Block */}
        <div className='space-y-3 p-5'>
          <h3 className='font-bold text-[#531b1b] text-xl line-clamp-1'>
            {meal.strMeal}
          </h3>

          <div className='flex justify-between items-center text-gray-600 text-sm'>
            <span className='bg-gradient-to-r from-yellow-300 to-orange-300 px-2 py-1 rounded-full font-medium text-black text-xs'>
              {meal.strCategory}
            </span>
            <span className='italic'>{meal.strArea}</span>
          </div>
        </div>
      </a>
    </div>
  )
}

export default MealCard
