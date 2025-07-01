import { FaKitchenSet } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='top-0 z-50 sticky bg-white shadow-md'>
      <div className='flex justify-between items-center mx-auto px-4 max-w-7xl h-14'>
        <div className='flex items-center gap-2 font-bold text-orange-600 text-xl'>
          <FaKitchenSet /> Taste Meal
        </div>
        <div className='flex space-x-6 text-sm md:text-base'>
          <Link
            to='/'
            className='text-gray-700 hover:text-orange-600 hover:underline transition'
          >
            Home
          </Link>
          <Link
            to='/random'
            className='text-gray-700 hover:text-orange-600 hover:underline transitio'
          >
            Random
          </Link>
          <Link
            to='/favorite'
            className='text-gray-700 hover:text-orange-600 hover:underline transition'
          >
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
