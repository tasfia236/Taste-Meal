// src/pages/Favorites.jsx
import { useSelector } from 'react-redux'
import MealGrid from '../components/MealGrid'
import { FaHeart } from 'react-icons/fa'

export default function Favorites () {
  const favorites = useSelector(state => state.meals.favorites)

  return (
    <div className='p-4 text-center'>
      <h2 className='flex justify-center items-center gap-2 mb-6 font-bold text-[#7c1d1d] text-2xl'>
      <FaHeart />  Your Favorite Meals
      </h2>
      {favorites.length > 0 ? (
        <MealGrid meals={favorites} />
      ) : (
        <p className='text-gray-500'>No favorites yet. Search and add some!</p>
      )}
    </div>
  )
}
