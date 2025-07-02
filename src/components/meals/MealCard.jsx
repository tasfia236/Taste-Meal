import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { addFavorite, removeFavorite } from '../../slice/meals/mealSlice'

const MealCard = ({ meal }) => {
  const dispatch = useDispatch()
  const { favorites } = useSelector((state) => state.meals)
  const isFavorite = favorites.find((m) => m.idMeal === meal.idMeal)

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
    <div className="group relative bg-white/80 shadow-md hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300">
      <div className="relative h-56 overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sky-900/60 via-transparent to-transparent"></div>

        <button
          onClick={toggleFavorite}
          className="top-3 right-3 absolute bg-white/70 hover:bg-cyan-200 p-2 rounded-full transition"
        >
          {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-sky-800" />}
        </button>
      </div>

      <a
        href={`https://www.themealdb.com/meal/${meal.idMeal}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="p-4">
          <h3 className="font-bold text-sky-900 text-lg line-clamp-1">{meal.strMeal}</h3>
          <div className="flex justify-between mt-1 text-gray-600 text-sm">
            <span className="bg-cyan-100 px-2 py-0.5 rounded-full font-semibold text-xs">
              {meal.strCategory}
            </span>
            <span className="italic">{meal.strArea}</span>
          </div>
        </div>
      </a>
    </div>
  )
}

export default MealCard
