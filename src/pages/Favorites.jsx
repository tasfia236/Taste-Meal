import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaHeart, FaTrashAlt } from 'react-icons/fa'
import { clearFilter, clearFavorites } from '../slice/meals/mealSlice'
import MealGrid from '../components/meals/MealGrid'

export default function Favorites() {
  const dispatch = useDispatch()
  const { favorites } = useSelector(state => state.meals)

  useEffect(() => {
    dispatch(clearFilter())
  }, [dispatch])

  const handleClearFavorites = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      dispatch(clearFavorites())
    }
  }

  return (
    <div className="bg-gradient-to-br from-cyan-100 via-cyan-50 to-white px-4 py-20 min-h-screen">
      {/* Decorative Shape */}
      <div className="top-0 left-0 -z-10 absolute bg-cyan-100 opacity-30 blur-[100px] rounded-full w-72 h-72"></div>
      <div className="right-0 bottom-0 -z-10 absolute bg-cyan-200 opacity-20 blur-[120px] rounded-full w-72 h-72"></div>

      <div className="z-10 relative mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <div className="inline-flex justify-center items-center gap-3 bg-white shadow-md px-6 py-4 border border-cyan-200 rounded-full">
            <FaHeart className="text-cyan-500 text-3xl animate-pulse" />
            <h2 className="font-bold text-cyan-800 text-3xl md:text-4xl tracking-wide">
              Favorite Meals
            </h2>
          </div>

          <p className="mt-4 text-gray-600 text-base md:text-lg">
            A handpicked list of your delicious favorites. Rediscover and enjoy anytime!
          </p>

          {favorites.length > 0 && (
            <button
              onClick={handleClearFavorites}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 hover:from-red-600 to-red-600 hover:to-red-700 shadow-lg mt-6 px-5 py-2 rounded-full font-semibold text-white hover:scale-105 transition"
            >
              <FaTrashAlt /> Clear All
            </button>
          )}
        </div>

        <MealGrid isFavoritePage={true} />
      </div>
    </div>
  )
}
