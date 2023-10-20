import './HistoryRow.css';

export function HistoryRow({number, bulls, cows}) {

    function icons(num, icon, isBull) {
        return [...Array(number.length).keys()]
            .map(idx => <img className={getClass(idx, num, isBull)} key={idx} src={icon} alt="icon"/>)
    }

    function getClass(idx, num, isBull) {
        if (isBull) {
            return idx < num ? "" : "invisible"
        } else {
            return idx < (number.length - num) ? "invisible" : ""
        }
    }

    return (
        <div className="historyRow">
            <div className="bulls">
                {icons(bulls, "assets/bullIcon.png", true)}
            </div>
            <div>
                {number}
            </div>
            <div className="cows">
                {icons(cows, "assets/cowIcon.png", false)}
            </div>
        </div>
    )
}