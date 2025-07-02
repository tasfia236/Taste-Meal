import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCategories,
  fetchIngredients,
  fetchByCategory,
  fetchByIngredients,
  clearFilter
} from '../../slice/meals/mealSlice'
import { FaKitchenSet } from 'react-icons/fa6'

export default function Filters () {
  const dispatch = useDispatch()
  const { categories, ingredients } = useSelector(state => state.meals)

  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedIngredients, setSelectedIngredients] = useState([])

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchIngredients())
  }, [dispatch])

  const handleCategoryChange = e => {
    const category = e.target.value
    setSelectedCategory(category)
    category ? dispatch(fetchByCategory(category)) : dispatch(clearFilter())
  }

  const handleIngredientToggle = ingredient => {
    const updated = selectedIngredients.includes(ingredient)
      ? selectedIngredients.filter(i => i !== ingredient)
      : [...selectedIngredients, ingredient]
    setSelectedIngredients(updated)
    updated.length > 0
      ? dispatch(fetchByIngredients(updated))
      : dispatch(clearFilter())
  }

  const handleClear = () => {
    setSelectedCategory('')
    setSelectedIngredients([])
    dispatch(clearFilter())
  }

  return (
    <div className='bg-white/40 shadow-xl backdrop-blur-md mb-14 p-8 border border-sky-100 rounded-2xl transition-all animate-fade-in-up duration-500'>
      {/* 🔰 Title */}
      <h3 className='flex items-center gap-3 mb-6 font-bold text-sky-900 text-2xl tracking-wide'>
        <FaKitchenSet className='text-cyan-500 text-2xl' />
        Advanced Meal Filters
      </h3>

      {/* Category Dropdown */}
      <div className='mb-8'>
        <label className='block mb-2 font-medium text-sky-800 text-sm'>
          Select Category:
        </label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className='bg-white shadow-sm p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full transition'
        >
          <option value=''>-- All Categories --</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Ingredients */}
      <div className='mb-8'>
        <label className='block mb-3 font-medium text-sky-800 text-sm'>
          Choose Ingredients:
        </label>
        <div className='flex flex-wrap gap-3 pr-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-300 scrollbar-track-white/30'>
          {ingredients.slice(0, 50).map(
            (ingredient, idx) =>
              ingredient && (
                <button
                  key={idx}
                  onClick={() => handleIngredientToggle(ingredient)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition border ${
                    selectedIngredients.includes(ingredient)
                      ? 'bg-cyan-500 text-white border-cyan-600 shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-cyan-100 hover:text-sky-800'
                  }`}
                >
                  {ingredient}
                </button>
              )
          )}
        </div>
        <p className='mt-2 text-gray-500 text-xs'>
          (Showing first 50 ingredients)
        </p>
      </div>

      {/* Clear Filter Button */}
      <div className='mt-4 text-right'>
        <button
          onClick={handleClear}
          className='bg-gradient-to-r from-cyan-600 hover:from-cyan-700 to-sky-500 hover:to-sky-600 shadow px-6 py-2 rounded-full font-semibold text-white transition-all duration-300'
        >
        Clear Filters
        </button>
      </div>
    </div>
  )
}
