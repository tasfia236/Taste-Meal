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
  async ({ ingredients = [], category = '' }) => {
    // 1. Fetch meals for each ingredient
    const ingredientResults = await Promise.all(
      ingredients.map(ing =>
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
          .then(res => res.json())
          .then(data => data.meals || [])
      )
    )

    // 2. Get intersection of meals across ingredients
    const allIds = ingredientResults.map(list => list.map(meal => meal.idMeal))
    const commonIds = allIds.reduce(
      (a, b) => a.filter(id => b.includes(id)),
      allIds[0] || []
    )

    const flattenedMeals = ingredientResults.flat()
    let filteredMeals = flattenedMeals.filter(meal =>
      commonIds.includes(meal.idMeal)
    )

    // 3. If category selected, fetch meals by category and filter
    if (category) {
      const catRes = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      )
      const catData = await catRes.json()
      const categoryMeals = catData.meals || []
      const categoryIds = categoryMeals.map(m => m.idMeal)

      if (filteredMeals.length > 0) {
        filteredMeals = filteredMeals.filter(m =>
          categoryIds.includes(m.idMeal)
        )
      } else {
        filteredMeals = categoryMeals
      }
    }

    // 4. If no filters applied, fallback to all meals
    if (!ingredients.length && !category) {
      const res = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s='
      )
      const data = await res.json()
      return data.meals || []
    }

    return filteredMeals
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
.addCase(fetchFilteredMeals.pending, (state) => {
  state.status = 'loading'
})
.addCase(fetchFilteredMeals.fulfilled, (state, action) => {
  state.status = 'succeeded'
  state.meals = action.payload
})
.addCase(fetchFilteredMeals.rejected, (state, action) => {
  state.status = 'failed'
  state.error = action.error.message
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
