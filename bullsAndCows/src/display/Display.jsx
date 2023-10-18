import './Display.css'
import {NumberSection} from "./NumberSection.jsx";

export function Display() {
    return (
        <div className="display">
            <NumberSection pos="1" />
            <NumberSection pos="2" />
            <NumberSection pos="3" />
        </div>
    )
}