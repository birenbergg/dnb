import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    highlightQuery: '',
    highlightedNum: 0
}

export const highlightSlice = createSlice({
    name: 'highlight',
    initialState,
    reducers: {
        setHighlightQuery: (state, action) => {
            state.highlightQuery = action.payload
        },
        setHighlightedNum: (state, action) => {
            state.highlightedNum = action.payload
        }
    }
})

export const { setHighlightQuery, setHighlightedNum } = highlightSlice.actions
export default highlightSlice.reducer