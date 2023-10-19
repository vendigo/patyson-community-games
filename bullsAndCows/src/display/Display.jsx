import './Display.css'
import {NumberSection} from "./NumberSection.jsx";

export function Display({currentNumber, length}) {
    function getSectionValue(i) {
        return i < currentNumber.length ? currentNumber.charAt(i) : ""
    }

    const sections = [...Array(length).keys()]
        .map(i => <NumberSection key={i} value={getSectionValue(i)} />)

    return (
        <div className="display">
            {sections}
        </div>
    )
}