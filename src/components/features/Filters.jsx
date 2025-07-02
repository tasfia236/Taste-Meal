import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCategories,
  fetchIngredients,
  fetchByCategory,
  fetchByIngredients,
  clearFilter
} from '../../slice/meals/mealSlice'

import {
  FaUtensils,
  FaFish,
  FaCookie,
  FaLeaf,
  FaBreadSlice
} from 'react-icons/fa'
import { LuBeef } from 'react-icons/lu'
import { GiChickenOven, GiGoat, GiNoodles } from 'react-icons/gi'
import { SiLamborghini } from 'react-icons/si'
import { IoFastFood } from 'react-icons/io5'
import { BiDrink } from 'react-icons/bi'
import { CiWheat } from 'react-icons/ci'
import { MdOutlineFreeBreakfast } from 'react-icons/md'
import { FaBowlFood } from 'react-icons/fa6'

const iconMap = {
  Beef: <LuBeef />,
  Goat: <GiGoat />,
  Chicken: <GiChickenOven />,
  Seafood: <FaFish />,
  Dessert: <FaCookie />,
  Vegetarian: <FaLeaf />,
  Lamb: <SiLamborghini />,
  Pasta: <GiNoodles />,
  Pork: <FaBowlFood />,
  Miscellaneous: <IoFastFood />,
  Starter: <BiDrink />,
  Vegan: <CiWheat />,
  Side: <MdOutlineFreeBreakfast />,
  Breakfast: <FaBreadSlice />,
  Default: <FaUtensils />
}

export default function Filters () {
  const dispatch = useDispatch()
  const { categories, ingredients } = useSelector(state => state.meals)

  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [showIngredients, setShowIngredients] = useState(false)

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchIngredients())
  }, [dispatch])

  const handleCategoryChange = category => {
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
    <div className='bg-gradient-to-br from-[#f0f9ff] to-[#ffffff] shadow-xl mb-14 p-6 md:p-8 rounded-3xl transition-all'>
      {/* Category */}
      <div className='mb-6 text-center'>
        <h3 className='mb-4 font-bold text-cyan-800 text-2xl'>
          Our Specials Menu
        </h3>
        <div className='flex flex-wrap justify-center gap-4'>
          <button
            onClick={() => handleCategoryChange('')}
            className={`flex flex-col items-center px-3 py-2 rounded-md ${
              selectedCategory === ''
                ? 'text-red-600 border-b-2 border-red-600'
                : 'text-gray-500 hover:text-red-500'
            }`}
          >
            <FaUtensils className='mb-1 text-xl' />
            All
          </button>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => handleCategoryChange(cat)}
              className={`flex flex-col items-center px-3 py-2 rounded-md ${
                selectedCategory === cat
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-500 hover:text-red-500'
              }`}
            >
              {iconMap[cat] || iconMap.Default}
              <span className='mt-1 text-sm'>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Ingredient Filter */}
      <div className='mb-6'>
        <div className='flex justify-between items-center mb-3'>
          <h4 className='font-semibold text-md text-sky-700'>Ingredients</h4>
          <button
            onClick={() => setShowIngredients(!showIngredients)}
            className='text-cyan-600 text-sm hover:underline'
          >
            {showIngredients ? 'Hide' : 'Show'} Ingredients
          </button>
        </div>

        {showIngredients && (
          <div className='flex flex-wrap gap-2 max-h-40 overflow-y-auto transition-all scrollbar-thin scrollbar-thumb-cyan-300 scrollbar-track-white/30'>
            {ingredients.slice(0, 30).map((ingredient, idx) => (
              <button
                key={idx}
                onClick={() => handleIngredientToggle(ingredient)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition ${
                  selectedIngredients.includes(ingredient)
                    ? 'bg-cyan-600 text-white border-cyan-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-cyan-100 hover:text-sky-800'
                }`}
              >
                {ingredient}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className='mt-6 text-right'>
        <button
          onClick={handleClear}
          className='bg-gradient-to-r from-cyan-600 hover:from-cyan-700 to-sky-500 hover:to-sky-600 shadow px-6 py-2 rounded-full font-semibold text-white transition-all'
        >
          Clear Filters
        </button>
      </div>
    </div>
  )
}
