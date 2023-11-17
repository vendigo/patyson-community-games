import './App.css'
import {Header} from "./header/Header.jsx";
import {Display} from "./display/Display.jsx";
import {Keyboard} from "./keyboard/Keyboard.jsx";
import {History} from "./history/History.jsx";
import {useEffect, useState} from "react";
import {getWinMessage, loadLevel} from "./PatysonClient.js";

export default function App() {
    const [currentNumber, setCurrentNumber] = useState("")
    const [history, setHistory] = useState([])
    const [level, setLevel] = useState({number: "000"})
    const [winMessage, setWinMessage] = useState(null)

    useEffect(() => {
        loadLevel().then(level => setLevel(level));
    }, []);

    const answer = level.number

    function handleNumberCompleted(completedNumber) {
        if (winMessage) return

        if (completedNumber === answer) {
            getWinMessage().then(winMessage => setWinMessage(winMessage))
        } else {
            addHistory(completedNumber)
            setCurrentNumber("")
        }
    }

    function addHistory(completedNumber) {
        let bulls = 0
        let cows = 0

        for (let i = 0; i < answer.length; i++) {
            let ch = completedNumber.charAt(i);
            if (answer.charAt(i) === ch) {
                bulls++
            } else if (answer.includes(ch)) {
                cows++
            }
        }

        setHistory([{bulls, cows, number: completedNumber}, ...history])
    }

    return (
        <>
            <Header/>
            <Display currentNumber={currentNumber} length={answer.length}/>
            {winMessage ? <h2>{winMessage}</h2> :
                (<>
                    <Keyboard currentNumber={currentNumber} answerLength={answer.length}
                              setCurrentNumber={setCurrentNumber} onNumberCompleted={handleNumberCompleted} />
                    <History history={history}/>
                </>)}
        </>
    )
}
