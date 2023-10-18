import './App.css'
import {Header} from "./header/Header.jsx";
import {Display} from "./display/Display.jsx";
import {Keyboard} from "./keyboard/Keyboard.jsx";
import {History} from "./history/History.jsx";

function App() {
    return (
        <>
            <Header/>
            <Display />
            <Keyboard />
            <History />
        </>
    )
}

export default App
