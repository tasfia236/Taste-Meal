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
    <div className='relative bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden hover:scale-105 transition hover:-translate-y-1 duration-300 transform'>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className='hover:brightness-90 w-full h-48 object-cover transition'
      />

      <div className='p-4'>
        <h3 className='font-semibold text-orange-500 text-lg'>{meal.strMeal}</h3>
        <p className='text-gray-500 text-sm'>
          {meal.strArea} | {meal.strCategory}
        </p>
        <button
          onClick={toggleFavorite}
          className='top-2 right-2 absolute text-orange-500 text-xl'
          title='Bookmark'
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
    </div>
  )
}

export default MealCard
