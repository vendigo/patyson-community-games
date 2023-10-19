import './App.css'
import {Header} from "./header/Header.jsx";
import {Display} from "./display/Display.jsx";
import {Keyboard} from "./keyboard/Keyboard.jsx";
import {History} from "./history/History.jsx";
import {useState} from "react";

function App() {
    const [currentNumber, setCurrentNumber] = useState("")
    const [history, setHistory] = useState([])
    const answer = "987"

    if (currentNumber.length === answer.length) {
        checkWin()
        addHistory()
        setCurrentNumber("")
    }

    function checkWin() {
        if (currentNumber === answer) {
            console.log('Win!')
        }
    }
    function addHistory() {
        let bulls = 0
        let cows = 0

        for (let i = 0; i < answer.length; i++) {
            let ch = currentNumber.charAt(i);
            if (answer.charAt(i) === ch) {
                bulls++
            } else if (answer.includes(ch)) {
                cows++
            }
        }

        const newHistory = [...history, {bulls, cows, number: currentNumber}]

        setHistory(newHistory)
    }

    return (
        <>
            <Header/>
            <Display currentNumber={currentNumber} length={answer.length}/>
            <Keyboard currentNumber={currentNumber} setCurrentNumber={setCurrentNumber}/>
            <History history={history}/>
        </>
    )
}

export default App
