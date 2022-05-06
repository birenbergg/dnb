import { useSelector, useDispatch } from 'react-redux'
import { setSearchQuery, getSearchResults } from '../../features/searchSlice'

const SearchBar = () => {
    const dispatch = useDispatch()
    
    const searchQuery = useSelector(state => state.search.searchQuery)

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(getSearchResults())
    }

    return (
        <form className='search-bar' onSubmit={handleSubmit}>
            <input type="search" onChange={e => dispatch(setSearchQuery(e.target.value))} value={searchQuery} />
            <button disabled={!searchQuery.trim()}>Search</button>
        </form>
    )
}

export default SearchBar