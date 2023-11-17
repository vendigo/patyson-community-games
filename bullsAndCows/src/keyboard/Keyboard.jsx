import './Keyboard.css'

export function Keyboard({currentNumber, answerLength, setCurrentNumber, onNumberCompleted}) {
    const nums = [...Array(10).keys()]

    function handleClick(num) {
        if (currentNumber.includes(num)) {
            return
        }

        const nextCurrentNumber = currentNumber + num
        setCurrentNumber(nextCurrentNumber)

        if (nextCurrentNumber.length === answerLength) {
            onNumberCompleted(nextCurrentNumber)
        }
    }

    return (
        <div className="keyboard">
            {nums.map(num => <button key={num} onClick={() => handleClick(num)}>{num}</button>)}
        </div>
    )
}