import './HistoryRow.css';
import bullIcon from "../assets/bullIcon.png";
import cowIcon from "../assets/cowIcon.png";

export function HistoryRow({number, bulls, cows}) {

    function icons(num, icon, isBull) {
        return [...Array(number.length).keys()]
            .map(idx => <img className={getClass(idx, num, isBull)} key={idx} src={icon} alt="icon"/>)
    }

    function getClass(idx, num, isBull) {
        if (isBull) {
            return idx < num ? "": "invisible"
        } else {
            return idx < (number.length - num) ? "invisible": ""
        }
    }

    return (
        <div className="historyRow">
            <div className="bulls">
                {icons(bulls, bullIcon, true)}
            </div>
            <div>
                {number}
            </div>
            <div className="cows">
                {icons(cows, cowIcon, false)}
            </div>
        </div>
    )
}