import Phaser from 'phaser'
import {GameBoard} from "./component/GameBoard";
import {DialogService} from "./service/DialogService";
import {WinReportingService} from "./service/WinReportingService";
import {LevelConfig} from "./config/LevelConfig";

export const GAME_NAME = "fillword"

export default class MainScene extends Phaser.Scene {

    private dialogService = new DialogService(this)
    private winReportingService = new WinReportingService(this.dialogService)

    constructor() {
        super(GAME_NAME)
    }

    preload() {
        this.load.json('level')
    }

    create() {
        const levelConfig = this.cache.json.get('level') as LevelConfig
        new GameBoard(this, levelConfig, () => this.onWin())
    }

    private onWin() {
        this.winReportingService.reportWin().then()
    }
}
