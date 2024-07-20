import { configureStore } from '@reduxjs/toolkit'
import minicartReducer from './cart/minicart'

export const store = () => {
  return configureStore({
    reducer: {
        minicartReducer
    }
  })
}