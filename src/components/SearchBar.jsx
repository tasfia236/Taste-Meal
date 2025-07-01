import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchMealsBySearch } from '../data/meals/mealSlice'
import { FaSearch } from 'react-icons/fa'

const SearchBar = () => {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    if (search.trim() !== '') dispatch(fetchMealsBySearch(search))
  }

  return (
    <form onSubmit={handleSubmit} className='flex justify-center gap-1'>
      <input
        type='text'
        placeholder='Search meals...'
        className='px-4 py-2 border border-gray-300 rounded-l-md w-64'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button className='flex justify-between items-center gap-2 bg-red-500 hover:bg-red-700 shadow px-4 py-2 rounded text-white transition-transform'>
        <FaSearch className='text-white' />
        Search
      </button>
    </form>
  )
}

export default SearchBar
