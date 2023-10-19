import './Keyboard.css'
import {Key} from "./Key.jsx";

export function Keyboard({currentNumber, setCurrentNumber}) {
    const row1 = [0, 1, 2, 3, 4]
    const row2 = [5, 6, 7, 8, 9]

    function keysRow(nums) {
        return nums.map(num => <Key key={num} num={num} onKeyClick={onKeyClick} />)
    }

    function addNumber(current, num) {
        if (current.length < 2) {
            return current + num
        }


        return current + num
    }

    function onKeyClick(num) {
        if (currentNumber.includes(num)) {
            return
        }

        setCurrentNumber(currentNumber + num)
    }

    return (
        <div className="keyboard">
            <div className="row">
                {keysRow(row1)}
            </div>
            <div className="row">
                {keysRow(row2)}
            </div>
        </div>
    )
}