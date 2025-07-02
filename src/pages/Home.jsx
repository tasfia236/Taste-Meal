import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchMealsBySearch } from '../slice/meals/mealSlice'
import SearchBar from '../components/features/SearchBar'
import FeaturedSlider from '../components/features/FeaturedSlider'
import MealGrid from '../components/meals/MealGrid'
import Hero from '../components/features/Hero'
import AboutSection from '../components/features/AboutSection'
import Filters from '../components/features/Filters'
import { FaKitchenSet } from 'react-icons/fa6'

export default function Home () {
  const { meals, status, error } = useSelector(state => state.meals)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchMealsBySearch(''))
  }, [dispatch])

  return (
    <div className='bg-gradient-to-br from-sky-50 via-white to-sky-100 min-h-screen text-gray-800'>
      {/* Hero Section */}
      <Hero />
      <AboutSection />

      {/* Featured Meals */}
      {meals.length > 0 && (
        <section className='mb-10'>
          <FeaturedSlider meals={meals.slice(0, 8)} />
        </section>
      )}

      {/* <div className='mx-auto px-4 py-6 max-w-7xl'> */}
      {/* Search */}
      <section className='mb-6'>
        <SearchBar />
      </section>

      {/* Filter */}
      <section className='mb-8'>
        <Filters />
      </section>

      {/* Meals Grid */}
      <section>
        {/* Heading */}
        <div className='my-2 text-center'>
          <h2 className='flex justify-center items-center gap-2 font-extrabold text-sky-900 text-3xl md:text-4xl'>
            <FaKitchenSet className='text-cyan-900' />
            Meals
          </h2>
          <p className='mt-2 text-sky-800 text-base'>
            Explore our all meals this week
          </p>
        </div>
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
    // </div>
  )
}
