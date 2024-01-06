const ERROR_MESSAGE = "Сталася помилка";
const GAME_NAME = "nonogrid";

export class PatysonClient {

    async getWinMessage(): Promise<String> {
        if (import.meta.env.DEV) {
            return this.buildWinMessage({experience: 10, gold: 5});
        }

        const urlParams = new URLSearchParams(window.location.search).toString()
        const gameName = this.getGameName();

        const fetchResult = await fetch(`/api/game/${gameName}?${urlParams}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
        const response = await fetchResult.json();

        if (response.status == GameStatus.FIRST_COMPLETION || response.status == GameStatus.NEXT_COMPLETION) {
            return this.buildWinMessage(response.reward);
        }
        return ERROR_MESSAGE
    }

    private buildWinMessage(reward: Reward | undefined) {
        if (!reward || reward.experience == 0) {
            return 'Перемога. Ви вже проходили цей рівень.'
        } else {
            return `Перемога. Ви отримали ${reward.experience} досвіду та ${reward.gold} золота.`
        }
    }

    private getGameName(): string {
        const path = window.location.pathname
        const parts = path.split("/").filter(v => v.length != 0)

        if (parts.length == 0) {
            return GAME_NAME
        }

        return parts[parts.length - 2]
    }
}

enum GameStatus {
    FIRST_COMPLETION = "FIRST_COMPLETION",
    NEXT_COMPLETION = "NEXT_COMPLETION"
}

class Reward {
    experience?: number;
    gold?: number;
}

class GameEventResponse {
    status?: GameStatus;
    reward?: Reward;
}