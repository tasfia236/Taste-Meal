import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCategories,
  fetchFilteredMeals,
  fetchIngredients
} from '../../slice/meals/mealSlice'
import { FaKitchenSet } from 'react-icons/fa6'

const FilterPanel = () => {
  const dispatch = useDispatch()
  const { ingredients, categories } = useSelector((state) => state.meals)
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    dispatch(fetchIngredients())
    dispatch(fetchCategories())
  }, [dispatch])

  const toggleIngredient = (ing) => {
    setSelectedIngredients((prev) =>
      prev.includes(ing) ? prev.filter((i) => i !== ing) : [...prev, ing]
    )
  }

  const applyFilter = () => {
    dispatch(
      fetchFilteredMeals({
        ingredients: selectedIngredients,
        category: selectedCategory
      })
    )
  }

  return (
    <div className="bg-white/40 shadow-md backdrop-blur-xl mb-14 p-6 border border-sky-100">
      <h3 className="flex justify-center items-center gap-2 mb-6 font-semibold text-sky-800 text-xl text-center">
        <FaKitchenSet /> Advanced Filter
      </h3>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {ingredients.map((ing) => (
          <button
            key={ing}
            onClick={() => toggleIngredient(ing)}
            className={`px-4 py-1.5 rounded-full border transition font-medium text-sm shadow-sm ${
              selectedIngredients.includes(ing)
                ? 'bg-cyan-500 text-white border-cyan-600 shadow-md'
                : 'bg-white text-gray-700 hover:bg-cyan-100 border-gray-200'
            }`}
          >
            {ing}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-white shadow-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-cyan-400 transition"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <button
          onClick={applyFilter}
          className="bg-gradient-to-r from-cyan-600 hover:from-cyan-700 to-sky-500 hover:to-sky-600 shadow-lg px-6 py-2.5 rounded-full font-semibold text-white transition duration-300"
        >
          Apply Filter
        </button>
      </div>
    </div>
  )
}

export default FilterPanel
