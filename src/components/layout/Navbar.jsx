import { FaHome, FaDice, FaHeart, FaBars, FaTimes } from 'react-icons/fa'
import { FaKitchenSet } from 'react-icons/fa6'
import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar () {
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClass = isActive =>
    isActive
      ? 'text-cyan-400 font-bold flex items-center gap-2 transition'
      : 'text-white hover:text-cyan-300 flex items-center gap-2 transition'

  return (
    <nav className='top-0 z-50 sticky bg-sky-900 shadow-md'>
      <div className='flex justify-between items-center mx-auto px-4 py-4 max-w-7xl'>
        {/* Logo */}
        <Link
          to='/'
          className='flex items-center gap-2 font-extrabold text-white text-2xl italic tracking-wider hover:scale-105 transition-transform'
        >
          <FaKitchenSet />
          TasteMeal
        </Link>

        {/* Desktop Menu */}
        <div className='hidden md:flex space-x-6 font-medium'>
          <NavLink to='/' className={({ isActive }) => linkClass(isActive)}>
            <FaHome />
            Home
          </NavLink>
          <NavLink
            to='/random'
            className={({ isActive }) => linkClass(isActive)}
          >
            <FaDice />
            Random
          </NavLink>
          <NavLink
            to='/favorite'
            className={({ isActive }) => linkClass(isActive)}
          >
            <FaHeart />
            Favorites
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='md:hidden text-white'
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className='md:hidden space-y-4 bg-sky-800 px-6 pt-2 pb-6 rounded-b-lg text-white text-base'>
          <NavLink
            to='/'
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => linkClass(isActive)}
          >
            <FaHome />
            Home
          </NavLink>
          <NavLink
            to='/random'
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => linkClass(isActive)}
          >
            <FaDice />
            Random
          </NavLink>
          <NavLink
            to='/favorite'
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => linkClass(isActive)}
          >
            <FaHeart />
            Favorites
          </NavLink>
        </div>
      )}
    </nav>
  )
}
