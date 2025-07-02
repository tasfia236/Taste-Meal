import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRandomMeal } from '../slice/meals/mealSlice'
import { FaDice, FaSearch } from 'react-icons/fa'

export default function RandomMeal () {
  const dispatch = useDispatch()
  const { meal, status } = useSelector(state => state.meals)

  useEffect(() => {
    dispatch(fetchRandomMeal(''))
  }, [dispatch])

  return (
    <div className='bg-gradient-to-br from-sky-50 via-white to-sky-100 px-4 md:px-8 py-10 min-h-screen'>
      <div className='bg-white/50 shadow-xl backdrop-blur-md mx-auto p-8 border border-sky-100 rounded-2xl max-w-5xl animate-fade-in-up'>
        <h2 className='flex justify-center items-center gap-3 mb-6 font-bold text-sky-800 text-3xl'>
          <FaDice className='text-cyan-600 text-2xl animate-bounce' />
          Random Meal Surprise
        </h2>

        {status === 'loading' && (
          <p className='text-cyan-600 text-center animate-pulse'>
            Fetching something tasty...
          </p>
        )}

        {meal && (
          <div className='flex md:flex-row flex-col gap-8'>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className='shadow-lg rounded-xl w-full md:w-1/2 h-auto hover:scale-[1.02] transition-transform'
            />

            <div className='flex-1 space-y-4'>
              <h3 className='pt-6 font-bold text-[#1d677c] text-2xl'>
                {meal.strMeal}
              </h3>
              <p className='text-gray-600 text-sm'>
                <strong className='text-sky-900'>Category:</strong>{' '}
                {meal.strCategory} <br />
                <strong className='text-sky-900'>Area:</strong> {meal.strArea}
              </p>
              <p className='text-gray-700 text-sm leading-relaxed'>
                <strong className='text-sky-800'>Instructions:</strong>{' '}
                {meal.strInstructions?.slice(0, 280)}...
              </p>
              <a
                href={meal.strYoutube}
                target='_blank'
                rel='noreferrer'
                className='inline-block bg-gradient-to-r from-cyan-600 hover:from-cyan-700 to-sky-500 hover:to-sky-600 shadow-md mt-2 px-6 py-2 rounded-full font-semibold text-white transition-all'
              >
               <div className='flex justify-center items-center gap-2'>
                 <FaSearch /> Watch Recipe Video
               </div>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
