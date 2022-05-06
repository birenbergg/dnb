import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import { setHighlightedNum } from '../../features/highlightSlice'

const escapeRegExp = text => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const Highlighted = ({ text = '', highlightQuery = '' }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setHighlightedNum(
            document.querySelectorAll('mark').length
        ))
    })

    if (!highlightQuery.trim()) return text

    const regex = new RegExp(`(${escapeRegExp(highlightQuery)})`, 'gi')
    const parts = text.split(regex)

    return (
        parts.map((part, i) => (
            regex.test(part) ? <mark key={i}>{part}</mark> : part
        ))
    )
}

export default Highlighted