import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaArrowLeft, FaDotCircle, FaYoutube } from 'react-icons/fa'
import { GoDotFill } from 'react-icons/go'

const MealDetails = () => {
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        const data = await res.json()
        setMeal(data.meals[0])
      } catch (err) {
        console.error('Failed to fetch meal:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMeal()
  }, [id])

  if (loading) return <div className="py-10 text-gray-600 text-center">Loading meal details...</div>
  if (!meal) return <div className="py-10 text-red-500 text-center">Meal not found.</div>

  // Extract ingredients and measurements
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push({
        ingredient: meal[`strIngredient${i}`],
        measure: meal[`strMeasure${i}`]
      })
    }
  }

  return (
    <section className="bg-[#fefefe] px-4 py-12 min-h-screen">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 font-medium text-cyan-800 hover:text-yellow-500 transition"
        >
          <FaArrowLeft /> Back to Home
        </Link>

        {/* Meal Details */}
        <div className="gap-10 grid md:grid-cols-2 bg-white/70 shadow-xl backdrop-blur-xl p-8 border border-gray-200 rounded-3xl">
          {/* Meal Image */}
          <div className="group relative">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="shadow-lg rounded-2xl w-full h-auto group-hover:scale-105 transition-transform duration-300"
            />
            <span className="right-4 bottom-4 absolute bg-cyan-900/90 shadow-lg px-3 py-1 rounded-full text-white text-xs">
              #{meal.idMeal}
            </span>
          </div>

          {/* Meal Info */}
          <div className="space-y-5 text-gray-800">
            <h1 className="font-bold text-cyan-900 text-4xl">{meal.strMeal}</h1>

            <p className="text-gray-600 text-sm italic">
              <span className="font-medium">Category:</span> {meal.strCategory} | 
              <span className="ml-2 font-medium">Area:</span> {meal.strArea}
            </p>

            <p className="text-gray-700 text-base leading-relaxed">
              {meal.strInstructions.slice(0, 350)}...
            </p>

            {/* Ingredients */}
            <div>
              <h3 className="mb-2 font-semibold text-cyan-900 text-xl">Ingredients</h3>
              <ul className="gap-x-4 gap-y-1 grid grid-cols-2 text-sm">
                {ingredients.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-1">
                  <GoDotFill /> {item.ingredient} — <span className="text-gray-600">{item.measure}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* YouTube Button */}
            {meal.strYoutube && (
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:shadow-lg mt-4 px-5 py-2.5 rounded-full font-medium text-white transition"
              >
                <FaYoutube size={18} /> Watch on YouTube
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MealDetails
