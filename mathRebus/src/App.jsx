import './App.css'
import {useEffect, useState} from "react";
import {getWinMessage, loadLevel} from "./PatysonClient.js";
import {Rebus} from "./rebus/Rebus.jsx";

function App() {
    const [level, setLevel] = useState({sign: "+", rows: []})
    const [gameState, setGameState] = useState([])
    const [winMessage, setWinMessage] = useState(null)

    useEffect(() => {
        loadLevel().then(level => {
            setLevel(level)
            const gameState = level.rows.map(row => {
                return {...row, value: row.word}
            })
            setGameState(gameState)
        })
    }, [])

    function handleChange(letter, numericValue) {
        if (winMessage) return

        let win = true
        const newStates = []
        for (const stateRow of gameState) {
            const newValue = Array.from(stateRow.word)
                .map((l, i) => letter === l ?
                    (numericValue.length === 0 ? letter : numericValue) : stateRow.value.charAt(i))
                .join("")
            const newState = {
                ...stateRow,
                value: newValue
            }
            newStates.push(newState)
            if (!new RegExp(newState.answer).test(newState.value)) {
                win = false
            }
        }

        if (win) {
            getWinMessage().then(message => setWinMessage(message))
        }

        setGameState(newStates)
    }

    return (
        <>
            <Rebus sign={level.sign} gameState={gameState} onChange={handleChange}/>
            {winMessage && <h2>{winMessage}</h2>}
        </>
    )
}

export default App
