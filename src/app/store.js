import { configureStore } from '@reduxjs/toolkit'
import mealReducer from '../data/meals/mealSlice.js'

export const store = configureStore({
  reducer: {
    meals: mealReducer,
  },
});

export default store;