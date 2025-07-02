import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaSearch } from 'react-icons/fa'
import { fetchMealsBySearch } from '../../slice/meals/mealSlice'

const SearchBar = () => {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (search.trim() !== '') dispatch(fetchMealsBySearch(search))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex md:flex-row flex-col justify-center items-center gap-4 mt-10 mb-14"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search your favorite dish..."
        className="bg-white/30 shadow-inner backdrop-blur-md px-6 py-3 border border-sky-200 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full max-w-md text-gray-800 placeholder:text-gray-500"
      />
      <button
        type="submit"
        className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 hover:from-cyan-600 to-sky-600 hover:to-sky-700 shadow-lg px-6 py-3 rounded-full font-semibold text-white transition duration-300"
      >
        <FaSearch />
        Search
      </button>
    </form>
  )
}

export default SearchBar
