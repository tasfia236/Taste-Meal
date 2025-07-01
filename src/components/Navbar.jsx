import { FaDice, FaHome, FaHeart, FaBars, FaTimes } from 'react-icons/fa';
import { FaKitchenSet } from 'react-icons/fa6';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = (isActive) =>
    isActive
      ? 'text-yellow-300 font-bold flex items-center gap-1'
      : 'text-gray-100 hover:text-yellow-500 flex items-center gap-1';

  return (
    <nav className="top-0 z-50 sticky bg-[#7c1d1d] shadow-lg text-white">
      <div className="flex justify-between items-center mx-auto px-4 py-4 max-w-7xl">
        <Link
          to="/"
          className="flex items-center gap-2 font-extrabold text-yellow-300 hover:text-white text-3xl italic tracking-wide transition"
        >
          <FaKitchenSet /> TasteMeal
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 font-semibold text-base">
          <NavLink to="/" className={({ isActive }) => linkClass(isActive)}>
            <FaHome /> Home
          </NavLink>
          <NavLink to="/random" className={({ isActive }) => linkClass(isActive)}>
            <FaDice /> Random
          </NavLink>
          <NavLink to="/favorite" className={({ isActive }) => linkClass(isActive)}>
            <FaHeart /> Favorites
          </NavLink>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden space-y-3 bg-[#6e1818] px-6 pb-4 font-medium text-sm">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className={({ isActive }) => linkClass(isActive)}>
            <FaHome /> Home
          </NavLink>
          <NavLink to="/random" onClick={() => setMenuOpen(false)} className={({ isActive }) => linkClass(isActive)}>
            <FaDice /> Random
          </NavLink>
          <NavLink to="/favorite" onClick={() => setMenuOpen(false)} className={({ isActive }) => linkClass(isActive)}>
            <FaHeart /> Favorites
          </NavLink>
        </div>
      )}
    </nav>
  );
}
