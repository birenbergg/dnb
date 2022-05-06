import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { setCurrentPage, setCurrentPageData } from '../../features/paginationSlice'

const Pagination = () => {
    const dispatch = useDispatch()

    const currentPage = useSelector(state => state.pagination.currentPage)
    const searchResults = useSelector(state => state.search.searchResults)

    const perPage = 10
    const offset = currentPage * perPage
    const pageCount = Math.ceil(searchResults && searchResults.length / perPage)

    const handlePageClick = ({ selected: selectedPage }) => {
        dispatch(setCurrentPage(selectedPage))
    }

    useEffect(() => {
        dispatch(setCurrentPageData(
            searchResults && searchResults.slice(offset, offset + perPage)
        ))
    })

    return (
        pageCount > 1 && <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={'pagination-container'}
            previousLinkClassName={'pagination-prev'}
            nextLinkClassName={'pagination-prev'}
            disabledClassName={'pagination-disabled'}
            activeClassName={'pagination-active'}
        />
    )
}

export default Pagination