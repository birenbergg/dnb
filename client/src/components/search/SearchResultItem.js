import { useSelector } from 'react-redux'
import Highlighted from '../highlight/Highlighted'

const SearchResultItem = ({ result }) => {
    const highlightQuery = useSelector(state => state.search.searchQuery)

    return (
        <a className='result' href={result.url} target="_blank" rel="noreferrer">
            <Highlighted text={result.title} highlightQuery={highlightQuery} />
        </a>
    )
}

export default SearchResultItem