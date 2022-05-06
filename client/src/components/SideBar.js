import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchQuery, getSearchResults, getPreviousQueries } from '../features/searchSlice'
import HighlightInput from '../components/highlight/HighlightInput'

const Sidebar = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPreviousQueries())
    }, [dispatch])

    const handleSearchByQuery = q => {
        dispatch(setSearchQuery(q))
        dispatch(getSearchResults())
    }

    const searchResults = useSelector(state => state.search.searchResults)
    const searchQueryHistory = useSelector(state => state.search.searchQueryHistory)

    return (
        <aside className="previous-search-queries-container">
            {(searchResults && searchResults.length > 0) && <HighlightInput />}
            {(searchQueryHistory && searchQueryHistory.length > 0) &&
                <div>
                    <h2>Previous Searches</h2>
                    <div>(Last 10, unique)<br />
                        <br />
                        Click on one of them to search again.
                    </div>
                    <div className="previous-search-queries">
                        {searchQueryHistory.map((sq, index) => {
                            return (<div className="previous-search-query" key={index} onClick={() => handleSearchByQuery(sq)}>{sq}</div>)
                        })}
                    </div>
                </div>}
        </aside>
    )
}

export default Sidebar