import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    searchQuery: '',
    searchResults: null,
    searchQueryHistory: [],
    isLoading: false,
    error: null
}

const apiUrl = 'https://dnb-api.birenbergg.com'

export const getSearchResults = createAsyncThunk(
    'searchResults/getSearchResults',
    async (_, { dispatch, getState, rejectWithValue }) => {
        const query = getState().search.searchQuery.trim()

        if (!query)
            dispatch(setSearchResults([]))
        else {
            const res = await fetch(`${apiUrl}?q=${query}`)
            const data = await res.json()

            if (res.status === 500) {
                return rejectWithValue(data.message)
            }

            dispatch(setSearchResults(data))
            dispatch(addSearchQueryHistory(query))
            dispatch(setPreviousQueries(query))
        }
    }
)

export const getPreviousQueries = createAsyncThunk(
    'previousQueries/getPreviousQueries',
    async (_, { dispatch, rejectWithValue }) => {
        const res = await fetch(`${apiUrl}/get-query-history`)
        const data = await res.json()

        if (res.status === 500) {
            return rejectWithValue(data.message)
        }

        dispatch(setSearchQueryHistory(data))
    }
)

export const setPreviousQueries = createAsyncThunk(
    'previousQueries/setPreviousQueries',
    async (query, { rejectWithValue }) => {
        const res = await fetch(`${apiUrl}/save-to-query-history`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        })

        if (res.status === 500) {
            const data = await res.json()
            return rejectWithValue(data.message)
        }
    }
)

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload
        },
        addSearchQueryHistory: (state, action) => {
            if (state.searchQueryHistory.includes(action.payload)) {
                state.searchQueryHistory = state.searchQueryHistory.filter(q => q !== action.payload)
            } else if (state.searchQueryHistory.length >= 10) {
                state.searchQueryHistory.shift()
            }

            state.searchQueryHistory.push(action.payload)
        },
        setSearchQueryHistory: (state, action) => {
            state.searchQueryHistory = action.payload
        }
    },
    extraReducers: {
        [getSearchResults.pending]: state => {
            state.isLoading = true
            state.searchResults = null
            state.error = null
        },
        [getSearchResults.fulfilled]: state => {
            state.isLoading = false
            state.error = null
        },
        [getSearchResults.rejected]: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        [getPreviousQueries.pending]: state => {
            state.error = null
        },
        [getPreviousQueries.fulfilled]: state => {
            state.error = null
        },
        [getPreviousQueries.rejected]: (state, action) => {
            state.error = action.payload
        },
        [setPreviousQueries.pending]: state => {
            state.error = null
        },
        [setPreviousQueries.fulfilled]: state => {
            state.error = null
        },
        [setPreviousQueries.rejected]: (state, action) => {
            state.error = action.payload
        }
    }
})

export const {
    setSearchQuery,
    setSearchResults,
    setSearchQueryHistory,
    addSearchQueryHistory
} = searchSlice.actions

export default searchSlice.reducer