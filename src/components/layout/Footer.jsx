import { FaFacebookF, FaYoutube, FaInstagram } from 'react-icons/fa'

export default function Footer () {
  return (
    <footer className='bg-sky-900 mt-20 text-white'>
      <div className='gap-10 grid grid-cols-1 md:grid-cols-3 mx-auto px-4 py-10 max-w-7xl md:text-left text-center'>
        <div>
          <h3 className='mb-2 font-bold text-cyan-300 text-xl'>TasteMeal</h3>
          <p className='text-gray-300 text-sm'>
            Explore flavors, recipes, and the joy of cooking with our featured
            meals updated weekly.
          </p>
        </div>

        <div>
          <h4 className='mb-2 font-semibold text-cyan-300'>Quick Links</h4>
          <ul className='space-y-1 text-sm'>
            <li>
              <a href='/' className='hover:underline'>
                Home
              </a>
            </li>
            <li>
              <a href='/random' className='hover:underline'>
                Random Meal
              </a>
            </li>
            <li>
              <a href='/favorite' className='hover:underline'>
                Favorites
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className='mb-2 font-semibold text-cyan-300'>Follow Us</h4>
          <div className='flex justify-center md:justify-start gap-4 text-lg'>
            <a href='#'>
              <FaFacebookF className='hover:text-cyan-400' />
            </a>
            <a href='#'>
              <FaYoutube className='hover:text-cyan-400' />
            </a>
            <a href='#'>
              <FaInstagram className='hover:text-cyan-400' />
            </a>
          </div>
        </div>
      </div>
      <div className='py-4 border-sky-800 border-t text-gray-400 text-sm text-center'>
        &copy; {new Date().getFullYear()} TasteMeal. All rights reserved.
      </div>
    </footer>
  )
}
