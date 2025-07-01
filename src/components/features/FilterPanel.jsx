import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCategories,
  fetchFilteredMeals,
  fetchIngredients
} from '../../slice/meals/mealSlice'

const FilterPanel = () => {
  const dispatch = useDispatch()
  const { ingredients, categories } = useSelector(state => state.meals)
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    dispatch(fetchIngredients())
    dispatch(fetchCategories())
  }, [dispatch])

  const toggleIngredient = ing => {
    setSelectedIngredients(prev =>
      prev.includes(ing) ? prev.filter(i => i !== ing) : [...prev, ing]
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
    <div className='bg-gray-50 shadow mx-auto mb-8 p-4 rounded-lg max-w-5xl'>
      <h3 className='mb-2 font-semibold text-[#7c1d1d] text-lg text-center'>
        Advanced Filter
      </h3>
      <div className='flex flex-wrap justify-center items-center gap-2 py-2'>
        {ingredients.map(ing => (
          <button
            key={ing}
            onClick={() => toggleIngredient(ing)}
            className={`px-3 py-1 rounded-full border ${
              selectedIngredients.includes(ing)
                ? 'bg-yellow-400 text-black'
                : 'bg-white text-gray-700'
            }`}
          >
            {ing}
          </button>
        ))}
      </div>
      <div className='flex items-center gap-3 mt-4'>
        <label className='font-medium'>Category:</label>
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className='p-2 border rounded focus:ring-yellow-400'
        >
          <option value=''>All</option>
          {categories.map(cat => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <button
          onClick={applyFilter}
          className='bg-[#7c1d1d] hover:bg-yellow-500 shadow ml-auto px-4 py-2 rounded-full text-white'
        >
          Apply Filter
        </button>
      </div>
    </div>
  )
}

export default FilterPanel
