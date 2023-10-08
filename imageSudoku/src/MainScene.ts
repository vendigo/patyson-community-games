import Phaser from 'phaser'
import {DialogService} from "./service/DialogService";
import {WinReportingService} from "./service/WinReportingService";
import {LevelConfig} from "./config/LevelConfig";
import {GameBoard} from "./component/GameBoard";
import {TilesBoard} from "./component/TilesBoard";

export const GAME_NAME = 'imageSudoku'

export default class MainScene extends Phaser.Scene {

    // @ts-ignore
    rexBoard: RextBoardPlugin;
    private dialogService = new DialogService(this)
    private winReportingService = new WinReportingService(this.dialogService)
    private alreadyWon = false

    constructor() {
        super(GAME_NAME)
    }

    preload() {
        this.load.json('level')
        this.load.spritesheet('animals', 'assets/animals.png', {frameWidth: 500, frameHeight: 500})
    }

    create() {
        const levelConfig = this.cache.json.get('level') as LevelConfig
        const gameBoard = new GameBoard(this, levelConfig, () => this.onWin())
        new TilesBoard(this, levelConfig, gameBoard)
    }

    private onWin() {
        if (!this.alreadyWon) {
            this.alreadyWon = true
            this.winReportingService.reportWin().then()
        }
    }
}
