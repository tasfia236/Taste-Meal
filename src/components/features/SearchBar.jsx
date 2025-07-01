import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaSearch } from 'react-icons/fa'
import { fetchMealsBySearch } from '../../slice/meals/mealSlice'

const SearchBar = () => {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    if (search.trim() !== '') dispatch(fetchMealsBySearch(search))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex justify-center gap-4 mt-6 mb-10'
    >
      <input
        type='text'
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder='Search your favorite dish...'
        className='shadow-md px-5 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 w-full max-w-md'
      />
      <button
        type='submit'
        className='flex items-center gap-2 bg-[#7c1d1d] hover:bg-red-700 shadow px-6 py-3 rounded-full font-semibold text-white transition'
      >
        <FaSearch /> Search
      </button>
    </form>
  )
}

export default SearchBar
