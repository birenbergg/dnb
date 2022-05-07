import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    highlightedNum: 0
}

export const highlightSlice = createSlice({
    name: 'highlight',
    initialState,
    reducers: {
        setHighlightedNum: (state, action) => {
            state.highlightedNum = action.payload
        }
    }
})

export const { setHighlightedNum } = highlightSlice.actions
export default highlightSlice.reducer