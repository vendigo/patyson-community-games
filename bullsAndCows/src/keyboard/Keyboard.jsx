import './Keyboard.css'

export function Keyboard({currentNumber, setCurrentNumber}) {
    const nums = [...Array(10).keys()]

    function onKeyClick(num) {
        if (currentNumber.includes(num)) {
            return
        }

        setCurrentNumber(currentNumber + num)
    }

    return (
        <div className="keyboard">
            {nums.map(num => <button key={num} onClick={() => onKeyClick(num)}>{num}</button>)}
        </div>
    )
}