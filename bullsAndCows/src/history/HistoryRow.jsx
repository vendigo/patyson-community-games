import './HistoryRow.css';
import bullIcon from "../assets/bullIcon.png";
import cowIcon from "../assets/cowIcon.png";

export function HistoryRow({number, bulls, cows}) {

    function icons(num, icon) {
        return [...Array(num).keys()]
            .map(idx => <img className="icon" key={idx} src={icon} alt="icon" />)
    }

    return (
        <div className="historyRow">
            <div>
                {icons(bulls, bullIcon)}
            </div>
            <div>
                {number}
            </div>
            <div>
                {icons(cows, cowIcon)}
            </div>
        </div>
    )
}