import './Header.css'
import bullImage from "../assets/bull.png";
import cowImage from "../assets/cow.png";

export function Header() {
    return (
        <div className="header">
            <div>
                <img className="headerImg" src={bullImage} alt="Bull"/>
                <h3>Вгадано цифр на своїх місцях</h3>
            </div>
            <div>
                <img className="headerImg" src={cowImage} alt="Cow"/>
                <h3>Вгадано цифр НЕ на своїх місцях</h3>
            </div>
        </div>
    )
}