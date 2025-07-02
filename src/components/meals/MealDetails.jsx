import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaArrowLeft, FaYoutube } from 'react-icons/fa'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const MealDetails = () => {
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('instructions')
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    <div className="bg-gradient-to-br from-sky-100 via-white to-pink-100 p-4 sm:p-10 min-h-screen">
      <div className="bg-white/80 shadow-xl backdrop-blur mx-auto rounded-3xl max-w-5xl overflow-hidden">
        
        {/* Header Section */}
        <div className="relative">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-72 object-cover"
          />
          <div className="top-0 left-0 absolute flex justify-center items-center bg-black/30 backdrop-blur-sm w-full h-full">
            <h1 className="drop-shadow-lg font-bold text-white text-3xl sm:text-5xl">{meal.strMeal}</h1>
          </div>
        </div>

        {/* Body Content */}
        <div className="space-y-6 p-6 sm:p-10">

          {/* Tags */}
          <div className="flex flex-wrap justify-between gap-4 text-sm">
            <span className="bg-sky-200 px-4 py-1 rounded-full font-medium text-sky-800">
              {meal.strCategory}
            </span>
            <span className="bg-rose-200 px-4 py-1 rounded-full font-medium text-rose-800">
              {meal.strArea}
            </span>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-gray-300 border-b">
            <button
              onClick={() => setActiveTab('instructions')}
              className={`pb-2 text-md font-medium transition ${
                activeTab === 'instructions'
                  ? 'border-b-2 border-sky-600 text-sky-800'
                  : 'text-gray-500 hover:text-sky-600'
              }`}
            >
              Instructions
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`pb-2 text-md font-medium transition ${
                activeTab === 'ingredients'
                  ? 'border-b-2 border-sky-600 text-sky-800'
                  : 'text-gray-500 hover:text-sky-600'
              }`}
            >
              Ingredients
            </button>
          </div>

          {/* Tab Content */}
          <div className="text-gray-700 text-sm leading-relaxed">
            {activeTab === 'instructions' && (
              <p className="whitespace-pre-line">{meal.strInstructions}</p>
            )}
            {activeTab === 'ingredients' && (
              <ul className="gap-3 grid grid-cols-1 sm:grid-cols-2">
                {ingredients.map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center bg-white/90 shadow-sm px-4 py-2 rounded-lg">
                    <span>{item.ingredient}</span>
                    <span className="text-gray-500 text-xs">{item.measure}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* YouTube Video Button */}
          {meal.strYoutube && (
            <div className="text-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 shadow-md px-5 py-2.5 rounded-full text-white"
              >
                <FaYoutube className="text-lg" />
                Watch on YouTube
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-8 text-center">
        <Link to="/" className="inline-flex items-center gap-2 font-medium text-sky-700 hover:text-sky-900">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white shadow-lg mx-auto mt-32 p-4 sm:p-6 rounded-2xl outline-none w-full max-w-3xl"
        overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800 text-lg">Recipe Video</h3>
          <button
            onClick={() => setIsModalOpen(false)}
            className="font-bold text-gray-600 hover:text-red-500 text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="w-full aspect-video">
          <iframe
            src={meal.strYoutube.replace('watch?v=', 'embed/')}
            title="YouTube video"
            frameBorder="0"
            allowFullScreen
            className="rounded-lg w-full h-full"
          />
        </div>
      </Modal>
    </div>
  )
}

export default MealDetails
