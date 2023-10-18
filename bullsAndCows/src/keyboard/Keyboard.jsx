import './Keyboard.css'
import {Key} from "./Key.jsx";

export function Keyboard() {
    const row1 = [0, 1, 2, 3, 4]
    const row2 = [5, 6, 7, 8, 9]

    function keysRow(nums) {
        return nums.map(num => <Key key={num} num={num} />)
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