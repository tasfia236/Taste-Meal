import { FaKitchenSet } from 'react-icons/fa6'

const Header = () => {
  return (
    <header className='bg-gradient-to-r from-orange-500 to-yellow-400 shadow py-6'>
      <div className='mx-auto px-4 max-w-6xl'>
        <h1 className='flex justify-center items-center gap-2 font-extrabold text-white text-3xl md:text-4xl text-center'>
          <FaKitchenSet className='text-white text-3xl' />
          Taste Meal
        </h1>
        <p className='mt-2 font-light text-white text-sm md:text-base text-center'>
          Discover meals from around the world
        </p>
      </div>
    </header>
  )
}

export default Header
