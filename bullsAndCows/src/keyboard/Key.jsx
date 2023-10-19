import './Key.css'

export function Key({num, onKeyClick}) {
    return (
        <button onClick={() => onKeyClick(num)}>{num}</button>
    )
}