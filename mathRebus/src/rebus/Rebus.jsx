import './Rebus.css'
import {Row} from "./Row.jsx";

export function Rebus({sign, gameState, onChange}) {
    const allRows = gameState
        .map((row, i) => <Row key={i} sign={i === gameState.length - 2 ? sign : ""}
                              word={row.word} state={row.value} onChange={onChange} />)
    const taskRows = allRows.slice(0, allRows.length - 1)
    const lastRow = allRows[allRows.length - 1]

    return (
        <div className="rebus">
            {taskRows}
            <hr />
            {lastRow}
        </div>
    )
}