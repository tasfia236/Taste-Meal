import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  meals: [],
  meal: null,
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  heroMeals: [],
  categories: [],
  ingredients: [],
  ingredientFiltered: [],
  filteredMeals: [],
  status: 'idle',
  error: null
}

// Search
export const fetchMealsBySearch = createAsyncThunk(
  'meals/fetchMealsBySearch',
  async name => {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    )
    return res.data.meals || []
  }
)

// Random
export const fetchRandomMeal = createAsyncThunk(
  'meals/fetchRandomMeal',
  async () => {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    )
    return res.data.meals[0]
  }
)

// Hero Slider
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

// Fetch ingredients
export const fetchIngredients = createAsyncThunk(
  'meals/fetchIngredients',
  async () => {
    const res = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    return res.data.meals.map(i => i.strIngredient).slice(0, 15)
  }
)

// Fetch all categories (used as dietary options too)
export const fetchCategories = createAsyncThunk(
  'meals/fetchCategories',
  async () => {
    const res = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    return res.data.meals.map(c => c.strCategory)
  }
)

// Filter meals
export const fetchFilteredMeals = createAsyncThunk(
  'meals/fetchFilteredMeals',
  async ({ ingredients, category }) => {
    let meals = []

    if (category) {
      const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      meals = res.data.meals || []
    } else {
      const randoms = await Promise.all(
        Array.from({ length: 5 }).map(() =>
          axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
        )
      )
      meals = randoms.map(r => r.data.meals[0])
    }

    // Filter by ingredients (client-side)
    if (ingredients?.length) {
      const fullDetails = await Promise.all(
        meals.slice(0, 15).map(meal =>
          axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
        )
      )

      meals = fullDetails
        .map(res => res.data.meals[0])
        .filter(meal => {
          const mealIngredients = Array.from({ length: 20 }, (_, i) =>
            meal[`strIngredient${i + 1}`]?.toLowerCase()
          )
          return ingredients.every(ing =>
            mealIngredients.includes(ing.toLowerCase())
          )
        })
    }

    return meals
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
  .addCase(fetchIngredients.fulfilled, (state, action) => {
    state.ingredients = action.payload
  })
  .addCase(fetchCategories.fulfilled, (state, action) => {
    state.categories = action.payload
  })
  .addCase(fetchFilteredMeals.pending, state => {
    state.status = 'loading'
  })
  .addCase(fetchFilteredMeals.fulfilled, (state, action) => {
    state.meals = action.payload
    state.status = 'succeeded'
  })
  .addCase(fetchFilteredMeals.rejected, (state, action) => {
    state.status = 'failed'
    state.error = action.error.message
  })
  }
})

export const { addFavorite, removeFavorite } = mealSlice.actions
export default mealSlice.reducer
