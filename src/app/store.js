import { configureStore } from '@reduxjs/toolkit'
import mealReducer from '../slice/meals/mealSlice.js'

export const store = configureStore({
  reducer: {
    meals: mealReducer,
  },
});

export default store;