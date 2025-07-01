import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchFilteredMeals } from '../data/meals/mealSlice'
import { FaFilter, FaKitchenSet } from 'react-icons/fa6'

// You can expand this list based on your app's supported categories/ingredients
const categories = [
  'All',
  'Vegan',
  'Vegetarian',
  'Seafood',
  'Beef',
  'Chicken',
  'Dessert'
]
const ingredients = [
  'Onion',
  'Tomato',
  'Garlic',
  'Chicken',
  'Beef',
  'Rice',
  'Cheese',
  'Mushroom',
  'Milk',
  'Lemon'
]

export default function FilterPanel () {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const dispatch = useDispatch()

  const toggleIngredient = ingredient => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(ing => ing !== ingredient)
        : [...prev, ingredient]
    )
  }

  const handleFilter = () => {
    dispatch(
      fetchFilteredMeals({
        ingredients: selectedIngredients,
        category: selectedCategory
      })
    )
  }

  return (
    <div className='bg-gray-100 shadow mx-auto mb-6 p-4 rounded-md max-w-5xl'>
      <h3 className='flex justify-center items-center gap-2 mb-4 font-semibold text-xl text-center'>
        <FaKitchenSet /> Advanced Meal Filters
      </h3>

      {/* Ingredient Filter */}
      <div className='mb-4'>
        <label className='block mb-1 font-medium text-gray-700 text-center'>
          Select Ingredients:
        </label>
        <div className='flex justify-center gap-2 py-2 overflow-x-auto whitespace-nowrap scrollbar-hide'>
          {ingredients.map(ing => (
            <button
              key={ing}
              onClick={() => toggleIngredient(ing)}
              className={`px-3 py-1 rounded-full border text-sm min-w-fit transition ${
                selectedIngredients.includes(ing)
                  ? 'bg-red-500 text-white border-red-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {ing}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className='flex justify-center items-center gap-3 mb-4'>
        <label className='content-center font-medium text-gray-700'>
          Dietary Category:
        </label>
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className='px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
        >
          {categories.map(cat => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Apply Filter Button */}
      <div className='text-center'>
        <button
          onClick={handleFilter}
          className='bg-red-500 hover:bg-red-700 shadow px-6 py-2 rounded text-white transition'
        >
          <p className='flex justify-center items-center gap-2'>
            <FaFilter /> Apply Filter
          </p>
        </button>
      </div>
    </div>
  )
}
