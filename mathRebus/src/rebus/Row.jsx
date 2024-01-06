import './Row.css';
import {Cell} from "./Cell.jsx";

export function Row({sign, word, state, onChange}) {
    const cells = Array.from(word)
        .map((letter, i) => <Cell key={i} letter={letter} state={state.charAt(i)} onChange={onChange}/>)

    return (
        <div className="row">
            <span className="sign">{sign}</span>
            {cells}
        </div>
    )
}