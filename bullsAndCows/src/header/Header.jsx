import './Header.css'

export function Header() {
    return (
        <div className="header">
            <div>
                <img className="headerImg" src="assets/bull.png" alt="Bull"/>
                <h3>Вгадано цифр на своїх місцях</h3>
            </div>
            <div>
                <img className="headerImg" src="assets/cow.png" alt="Cow"/>
                <h3>Вгадано цифр НЕ на своїх місцях</h3>
            </div>
        </div>
    )
}