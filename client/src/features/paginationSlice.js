import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentPage: 0,
    currentPageData: null
}

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setCurrentPageData: (state, action) => {
            state.currentPageData = action.payload
        }
    }
})

export const { setCurrentPage, setCurrentPageData } = paginationSlice.actions
export default paginationSlice.reducer