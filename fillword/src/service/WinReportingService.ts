import {DialogService} from "./DialogService";
import Dialog from "phaser3-rex-plugins/templates/ui/dialog/Dialog";
import {GAME_NAME} from "../MainScene";

const ERROR_MESSAGE = "Сталася помилка"

export class WinReportingService {

    private dialogService: DialogService

    constructor(dialogService: DialogService) {
        this.dialogService = dialogService;
    }

    buildWinMessage(reward: Reward | undefined) {
        if (!reward || reward.experience == 0) {
            return 'Перемога'
        } else {
            return `Перемога.\n+ ${reward.experience} досвіду \n+ ${reward.gold} золота`
        }
    }

    reportWin(): Promise<Dialog.CloseEventDataType | Dialog> {
        if (import.meta.env.DEV) {
            const message = this.buildWinMessage({experience: 10, gold: 5});
            return this.dialogService.show(message)
        }

        const urlParams = new URLSearchParams(window.location.search).toString()
        const gameName = this.getGameName();

        return fetch(`/api/game/${gameName}?${urlParams}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(response => response.json())
            .then((response: GameEventResponse) => {
                if (response.status == GameStatus.FIRST_COMPLETION || response.status == GameStatus.NEXT_COMPLETION) {
                    const message = this.buildWinMessage(response.reward);
                    return this.dialogService.show(message);
                }
                return this.dialogService.show(ERROR_MESSAGE)
            })
    }

    getGameName(): string {
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