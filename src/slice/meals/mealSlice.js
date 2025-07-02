import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  meals: [],
  meal: null,
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  heroMeals: [],
  categories: [],
  ingredients: [],
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

// all categories
export const fetchCategories = createAsyncThunk(
  'meals/fetchCategories',
  async () => {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/list.php?c=list`
    )
    console.log('Categories:', res)
    return res.data.meals.map(m => m.strCategory)
  }
)

// all ingredients
export const fetchIngredients = createAsyncThunk(
  'meals/fetchIngredients',
  async () => {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    )
    console.log('Ingredients:', res)
    return res.data.meals.map(m => m.strIngredient)
  }
)

//  Filter by category
export const fetchByCategory = createAsyncThunk(
  'meals/fetchByCategory',
  async category => {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    )
    console.log('By Categories:', res)
    return res.data.meals || []
  }
)

// Filter by ingredient (multiple)
export const fetchByIngredients = createAsyncThunk(
  'meals/fetchByIngredients',
  async selectedIngredients => {
    // Fetch meals for each ingredient and find common ids
    const requests = selectedIngredients.map(ingredient =>
      axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      )
    )
    const responses = await Promise.all(requests)
    const mealsList = responses.map(res => res.data.meals || [])
    console.log('By MealsList:', mealsList)

    // Intersect meals by idMeal
    const commonMeals = mealsList.reduce((acc, meals) => {
      const ids = meals.map(m => m.idMeal)
      return acc.filter(id => ids.includes(id))
    }, mealsList[0]?.map(m => m.idMeal) || [])
    console.log('CommonMeals:', commonMeals)

    // Fetch full details using idMeal
    const detailRequests = commonMeals.map(id =>
      axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    )
    const detailedResponses = await Promise.all(detailRequests)
    const detailedMeals = detailedResponses.map(res => res.data.meals[0])

    return detailedMeals
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
    },
    clearFavorites: state => {
      state.favorites = []
      localStorage.removeItem('favorites')
    },
    clearFilter: state => {
      state.filteredMeals = []
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

      // Category
      .addCase(fetchCategories.pending, state => {
        state.loading = true
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload || []
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      //Ingredients
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload || []
      })
      .addCase(fetchByCategory.fulfilled, (state, action) => {
        state.filteredMeals = action.payload || []
      })
      .addCase(fetchByIngredients.fulfilled, (state, action) => {
        state.filteredMeals = action.payload || []
      })
  }
})

export const { addFavorite, removeFavorite, clearFavorites, clearFilter } = mealSlice.actions
export default mealSlice.reducer
