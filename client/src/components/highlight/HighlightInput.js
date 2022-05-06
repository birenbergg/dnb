import { useSelector, useDispatch } from 'react-redux'
import { setHighlightQuery } from '../../features/highlightSlice'

const HighlightInput = () => {
    const dispatch = useDispatch()
    const highlightedNum = useSelector(state => state.highlight.highlightedNum)

    return (
        <div className='find-in-results'>
            <input type="text" placeholder='Find in results' onChange={e => dispatch(setHighlightQuery(e.target.value))} />
            {highlightedNum > 0 && <div className='found'>&nbsp;(Found:&nbsp;<strong>{highlightedNum}</strong>)</div>}
        </div>
    )
}

export default HighlightInput