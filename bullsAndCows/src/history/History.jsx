import './History.css'
import {HistoryRow} from "./HistoryRow.jsx";

export function History({history}) {
    const rows = history
        .map((row, i) => <HistoryRow key={i} number={row.number} bulls={row.bulls} cows={row.cows} />)

    return (
        <div className="history">
            {rows}
        </div>
    )
}