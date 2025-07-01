import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import MealCard from './MealCard'
import { FaKitchenSet } from 'react-icons/fa6'

export default function FeaturedSlider ({ meals }) {
  return (
    <div className='px-4 py-8'>
      <h2 className='flex justify-center items-center gap-2 mb-4 font-bold text-xl text-center'>
        <FaKitchenSet /> Featured Meals
      </h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
      >
        {meals.map(meal => (
          <SwiperSlide key={meal.idMeal}>
            <MealCard meal={meal} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
