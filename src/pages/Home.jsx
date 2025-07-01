import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchMealsBySearch } from '../slice/meals/mealSlice'
import HeroSlider from '../components/features/HeroSlider'
import SearchBar from '../components/features/SearchBar'
import FilterPanel from '../components/features/FilterPanel'
import FeaturedSlider from '../components/features/FeaturedSlider'
import MealGrid from '../components/meals/MealGrid'

export default function Home () {
  const { meals, status, error } = useSelector(state => state.meals)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchMealsBySearch(''))
  }, [dispatch])

  return (
    <div className=''>
      {/* Hero Section */}
      <HeroSlider />
      <div className='mx-auto px-4 py-6 max-w-7xl'>
        {/* Search */}
        <section className='mb-6'>
          <SearchBar />
        </section>

        {/* Filter */}
        <section className='mb-8'>
          <FilterPanel />
        </section>

        {/* Featured Meals */}
        {meals.length > 0 && (
          <section className='mb-10'>
            <FeaturedSlider meals={meals.slice(0, 8)} />
          </section>
        )}

        {/* Meals Grid */}
        <section>
          {status === 'loading' && (
            <p className='font-medium text-gray-600 text-lg text-center'>
              Loading...
            </p>
          )}
          {status === 'failed' && (
            <p className='flex justify-center items-center gap-2 font-semibold text-red-500 text-center'>
              <MdErrorOutline className='text-2xl' /> {error}
            </p>
          )}
          {meals.length > 0 && <MealGrid meals={meals} />}
          {meals.length === 0 && status === 'succeeded' && (
            <p className='text-gray-500 text-lg text-center'>No meals found.</p>
          )}
        </section>
      </div>
    </div>
  )
}
