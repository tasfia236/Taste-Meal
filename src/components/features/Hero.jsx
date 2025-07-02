import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHeroMeals } from '../../slice/meals/mealSlice'

export default function Hero () {
  const dispatch = useDispatch()
  const { heroMeals, status } = useSelector(state => state.meals)

  useEffect(() => {
    if (heroMeals.length === 0) {
      dispatch(fetchHeroMeals())
    }
  }, [dispatch, heroMeals.length])

  if (status === 'loading' || heroMeals.length < 2) {
    return <p className='py-10 text-cyan-600 text-center'>Loading meals...</p>
  }

  return (
    <section className='w-full'>
      <Swiper
        modules={[Autoplay, Pagination]}
        loop
        autoplay={{ delay: 4500 }}
        pagination={{ clickable: true }}
        className='w-full h-[90vh]'
      >
        {heroMeals.map(meal => (
          <SwiperSlide key={meal.idMeal}>
            <div className='relative w-full h-full'>
              {/* Background */}
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className='top-0 left-0 absolute brightness-[0.6] w-full h-full object-cover'
              />

              {/* Gradient Overlay */}
              <div className='absolute inset-0 bg-gradient-to-r from-sky-950/70 via-sky-700/40 to-transparent'></div>

              <div className='absolute inset-0 bg-gradient-to-r from-zinc-950/70 via-gray-700/40 to-transparent'></div>

              {/* Content */}
              <div className='z-10 relative flex items-center px-6 md:px-20 w-full h-full'>
                <div className='space-y-5 max-w-2xl text-white animate-fade-in-up'>
                  <h2 className='font-bold text-4xl md:text-6xl tracking-tight'>
                    {meal.strMeal}
                  </h2>
                  <p className='text-sky-100 text-lg md:text-xl'>
                    A delicious{' '}
                    <span className='font-medium text-sky-200'>
                      {meal.strCategory}
                    </span>{' '}
                    dish from <span className='underline'>{meal.strArea}</span>
                  </p>
                  <div className='flex gap-3'>
                    <a
                      href={`https://www.themealdb.com/meal/${meal.idMeal}`}
                      target='_blank'
                      rel='noreferrer'
                      className='bg-white px-5 py-2 rounded-full font-semibold text-sky-800 hover:scale-105 transition'
                    >
                      View Recipe
                    </a>
                    <a
                      href={meal.strYoutube}
                      target='_blank'
                      rel='noreferrer'
                      className='bg-cyan-600 hover:bg-cyan-700 hover:shadow-white px-5 py-2 rounded-full text-white hover:scale-105 transition'
                    >
                      Watch Video
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
