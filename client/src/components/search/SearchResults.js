import { useSelector } from 'react-redux'
import SearchResultItem from '../search/SearchResultItem'

const SearchResults = () => {
    const searchResults = useSelector(state => state.search.searchResults)
    const isLoading = useSelector(state => state.search.isLoading)
    const error = useSelector(state => state.search.error)

    const currentPageData = useSelector(state => state.pagination.currentPageData)

    return (
        <div className='search-results'>
            {isLoading && <div className='loading'>Loading...</div>}
            {error && <div className='error'>{error}</div>}
            {currentPageData && currentPageData.map((result, index) => (
                <SearchResultItem result={result} key={index} />
            ))}
            {(searchResults && !searchResults.length) && <div className='no-results'>No results</div>}
        </div>
    )
}

export default SearchResults