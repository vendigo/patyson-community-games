import './History.css'
import {HistoryRow} from "./HistoryRow.jsx";

export function History() {
    return (
        <div className="history">
            <HistoryRow number="218" bulls="0" cows="1" />
            <HistoryRow number="319" bulls="1" cows="2" />
            <HistoryRow number="345" bulls="2" cows="0" />
            <HistoryRow number="341" bulls="3" cows="0" />
        </div>
    )
}