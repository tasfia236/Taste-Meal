import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  meals: [],
  meal: null,
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  heroMeals: [],
  status: 'idle',
  error: null
}

export const fetchMealsBySearch = createAsyncThunk(
  'meals/fetchMealsBySearch',
  async name => {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    )
    return res.data.meals || []
  }
)

export const fetchRandomMeal = createAsyncThunk(
  'meals/fetchRandomMeal',
  async () => {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    )
    return res.data.meals[0]
  }
)

export const fetchFilteredMeals = createAsyncThunk(
  'meals/fetchFilteredMeals',
  async ({ ingredients, category }) => {
    try {
      if (!ingredients.length) return []

      const ingredientResponses = await Promise.all(
        ingredients.map(ing =>
          axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`
          )
        )
      )

      const mealsByIngredient = ingredientResponses.map(
        res => res.data.meals || []
      )

      const idMaps = mealsByIngredient.map(meals =>
        meals.map(meal => meal.idMeal)
      )
      const commonMealIds = idMaps.reduce((a, b) =>
        a.filter(id => b.includes(id))
      )

      if (commonMealIds.length === 0) return []

      const fullDetails = await Promise.all(
        commonMealIds.map(id =>
          axios.get(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          )
        )
      )

      let finalMeals = fullDetails.map(res => res.data.meals[0])

      if (category && category !== 'All') {
        finalMeals = finalMeals.filter(meal => meal.strCategory === category)
      }

      return finalMeals
    } catch (err) {
      console.error('Multi-ingredient filter error:', err.message)
      return []
    }
  }
)

export const fetchHeroMeals = createAsyncThunk(
  'meals/fetchHeroMeals',
  async () => {
    const promises = Array.from({ length: 6 }, () =>
      fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(res =>
        res.json()
      )
    )
    const results = await Promise.all(promises)
    return results.map(data => data.meals[0])
  }
)

const mealSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.favorites.find(
        m => m.idMeal === action.payload.idMeal
      )
      if (!exists) {
        state.favorites.push(action.payload)
        localStorage.setItem('favorites', JSON.stringify(state.favorites))
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(m => m.idMeal !== action.payload)
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMealsBySearch.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchMealsBySearch.fulfilled, (state, action) => {
        state.meals = action.payload || []
        state.status = 'succeeded'
      })
      .addCase(fetchMealsBySearch.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(fetchRandomMeal.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchRandomMeal.fulfilled, (state, action) => {
        state.meal = action.payload
        state.status = 'succeeded'
      })
      .addCase(fetchRandomMeal.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchFilteredMeals.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.meals = action.payload
      })
      .addCase(fetchHeroMeals.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchHeroMeals.fulfilled, (state, action) => {
        state.heroMeals = action.payload
        state.status = 'succeeded'
      })
      .addCase(fetchHeroMeals.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { addFavorite, removeFavorite } = mealSlice.actions
export default mealSlice.reducer
