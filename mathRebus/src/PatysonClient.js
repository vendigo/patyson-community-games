const GAME_NAME = "mathRebus";

export const loadLevel = async () => {
    const response = await fetch('level.json')
    return response.json()
}

export const getWinMessage = async () => {
    if (import.meta.env.DEV) {
        return buildWinMessage({experience: 10, gold: 5})
    }

    const urlParams = new URLSearchParams(window.location.search).toString()
    const gameName = getGameName()

    const fetchResult = await fetch(`/api/game/${gameName}?${urlParams}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    });
    const response = await fetchResult.json()

    if (response.status === "FIRST_COMPLETION" || response.status === "NEXT_COMPLETION") {
        return buildWinMessage(response.reward)
    }
    return "Сталася помилка"
}

function buildWinMessage(reward) {
    if (!reward || reward.experience === 0) {
        return 'Перемога. Ви вже проходили цей рівень.'
    } else {
        return `Перемога. Ви отримали ${reward.experience} досвіду та ${reward.gold} золота.`
    }
}

function getGameName() {
    const path = window.location.pathname
    const parts = path.split("/").filter(v => v.length !== 0)

    if (parts.length === 0) {
        return GAME_NAME
    }

    return parts[parts.length - 2]
}