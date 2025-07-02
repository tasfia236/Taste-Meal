import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import MealCard from '../meals/MealCard'
import { FaKitchenSet } from 'react-icons/fa6'

export default function FeaturedSlider ({ meals }) {
  return (
    <div className='relative bg-gradient-to-br from-sky-50 via-sky-100 to-cyan-50 px-4 py-20 overflow-hidden'>
      {/* Soft Glow Background */}
      <div className='top-0 left-1/2 -z-10 absolute bg-gradient-to-tr from-cyan-300 via-white to-sky-400 opacity-30 blur-[160px] rounded-full w-[800px] h-[800px] -translate-x-1/2 transform' />

      {/* Heading */}
      <div className='mb-12 text-center'>
        <h2 className='flex justify-center items-center gap-2 font-extrabold text-sky-900 text-3xl md:text-4xl'>
          <FaKitchenSet className='text-cyan-900' />
          Featured Meals
        </h2>
        <p className='mt-2 text-sky-800 text-base'>
          Explore our most loved meals this week
        </p>
      </div>

      {/* Slider */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        loop
        grabCursor
        spaceBetween={24}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 }
        }}
        className='mx-auto max-w-7xl'
      >
        {meals.map(meal => (
          <SwiperSlide key={meal.idMeal}>
            <div className='hover:scale-[1.03] transition-transform duration-300'>
              <div className='bg-gradient-to-br from-sky-500 via-sky-300 to-sky-500 shadow-lg p-[2px] rounded-2xl'>
                <div className='bg-sky-200 backdrop-blur rounded-2xl h-[320px] overflow-hidden'>
                  <MealCard meal={meal} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
