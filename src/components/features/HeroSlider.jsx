import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHeroMeals } from '../../slice/meals/mealSlice'

export default function HeroSlider () {
  const dispatch = useDispatch()
  const { heroMeals, status } = useSelector(state => state.meals)

  useEffect(() => {
    if (heroMeals.length === 0) {
      dispatch(fetchHeroMeals())
    }
  }, [dispatch, heroMeals.length])

  if (status === 'loading' || heroMeals.length < 2) {
    return <p className='py-10 text-yellow-500 text-center'>Loading meals...</p>
  }

  return (
    <section className='relative w-full'>
      <Swiper
        modules={[Autoplay, Pagination]}
        loop
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        className='w-full h-[90vh]'
      >
        {heroMeals.map(meal => (
          <SwiperSlide key={meal.idMeal}>
            <div className='relative w-full h-full'>
              {/* Background Image */}
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className='top-0 left-0 absolute brightness-[0.5] w-full h-full object-cover'
              />

              {/* Gradient Overlay */}
              <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent'></div>

              {/* Content */}
              <div className='z-10 relative flex items-center px-4 md:px-16 w-full h-full'>
                <div className='max-w-2xl text-white animate-fade-in-up'>
                  <h2 className='mb-4 font-extrabold text-4xl md:text-6xl uppercase leading-tight tracking-wider'>
                    {meal.strMeal}
                  </h2>
                  <p className='mb-6 text-neutral-200 text-lg md:text-xl'>
                    A classic{' '}
                    <span className='font-semibold text-amber-300'>
                      {meal.strCategory}
                    </span>{' '}
                    dish from <span className='underline'>{meal.strArea}</span>{' '}
                    refined and flavorful.
                  </p>
                  <div>
                    <a
                      href={`https://www.themealdb.com/meal/${meal.idMeal}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-block bg-gradient-to-r from-amber-500 to-yellow-400 hover:shadow-[0_0_15px_rgba(234,179,8,0.5)] mx-2 px-6 py-3 rounded-full font-semibold text-black text-sm uppercase tracking-widest transition duration-300'
                    >
                      View Recipe
                    </a>
                    <a
                      href={meal.strYoutube}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-block bg-gradient-to-r from-red-900 to-red-800 hover:shadow-[0_0_15px_rgba(234,179,8,0.5)] px-6 py-3 rounded-full font-semibold text-white text-sm uppercase tracking-widest transition duration-300'
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
