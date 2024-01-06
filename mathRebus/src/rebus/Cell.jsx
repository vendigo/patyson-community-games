import './Cell.css'

const isNumberRegex = /^\d$/
const notNumbersRegex = /[^0-9]/g

export function Cell({letter, state, onChange}) {
    const inputValue = isNumberRegex.test(state) ? state : ""
    const readonly = isNumberRegex.test(letter)

    function handleChange(e) {
        if (readonly) return

        const value = e.target.value
        const numericValue = value.replace(notNumbersRegex, '')

        if (numericValue.length <= 1) {
            onChange(letter, numericValue)
        }
    }

    return <input type="number" className="cell" placeholder={letter} value={inputValue} onChange={handleChange}/>
}