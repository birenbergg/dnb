import { useSelector, useDispatch } from 'react-redux'
import { setSearchQuery, getSearchResults } from '../../features/searchSlice'

const SearchBar = () => {
    const dispatch = useDispatch()

    const searchQuery = useSelector(state => state.search.searchQuery)
    const highlightedNum = useSelector(state => state.highlight.highlightedNum)

    const handleOnChange = e => {
        dispatch(setSearchQuery(e.target.value))
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(getSearchResults())
    }

    return (
        <form className='search-bar' onSubmit={handleSubmit}>
            <div className="search">
                <input type="search" onChange={e => handleOnChange(e)} value={searchQuery} />
                <button disabled={!searchQuery.trim()}>Search</button>
            </div>
            {highlightedNum > 0 && <div className='found'>&nbsp;(Found on page:&nbsp;<strong>{highlightedNum}</strong>)</div>}
        </form>
    )
}

export default SearchBar