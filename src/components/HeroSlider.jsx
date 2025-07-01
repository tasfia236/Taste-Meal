import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHeroMeals } from '../data/meals/mealSlice'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'

const HeroSlider = () => {
  const dispatch = useDispatch()
  const { heroMeals, status } = useSelector((state) => state.meals)

  useEffect(() => {
    if (heroMeals.length === 0) {
      dispatch(fetchHeroMeals())
    }
  }, [dispatch, heroMeals.length])

  if (status === 'loading' || heroMeals.length < 2) {
    return <p className="py-10 text-orange-500 text-center">Loading meals...</p>
  }

  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
      slidesPerView={1}
    >
      {heroMeals.map((meal) => (
        <SwiperSlide key={meal.idMeal}>
          <div className="flex md:flex-row flex-col justify-between items-center bg-[#fef7f3] px-4 py-10 md:py-20">
            {/* Text */}
            <div className="md:w-1/2 md:text-left text-center">
              <p className="font-semibold text-rose-500 text-sm uppercase">Best in TasteMeal</p>
              <h2 className="font-extrabold text-gray-800 text-3xl md:text-5xl">
                {meal.strMeal.split(' ').slice(0, 3).join(' ')} <span className="font-bold text-rose-600">{meal.strMeal.split(' ').slice(3).join(' ')}</span>
              </h2>
              <p className="mt-4 text-gray-600">
                {meal.strInstructions.slice(0, 100)}...
              </p>
              <div className="flex justify-center md:justify-start mt-6">
                <button className="bg-rose-600 hover:bg-rose-700 shadow px-6 py-3 rounded-lg text-white">
                  Order Now
                </button>
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-rose-50 ml-4 px-6 py-3 border border-rose-600 rounded-lg text-rose-600"
                >
                  Watch Video
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center mt-8 md:mt-0 md:w-1/2">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="shadow-lg border-4 border-white rounded-full w-48 md:w-64 h-48 md:h-64 object-cover"
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default HeroSlider;