import { configureStore } from '@reduxjs/toolkit'
import searchSlice  from '../features/searchSlice'
import highlightSlice from '../features/highlightSlice'
import paginationSlice from '../features/paginationSlice'

export const store = configureStore({
    reducer: {
        search: searchSlice,
        highlight: highlightSlice,
        pagination: paginationSlice
    }
})