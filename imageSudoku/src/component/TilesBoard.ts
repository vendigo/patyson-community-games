import Board from "phaser3-rex-plugins/plugins/board/board/Board";
import Phaser from "phaser";
import {LevelConfig} from "../config/LevelConfig";
import {TilesBoardViewConfig} from "./BoardViewConfigs";
import {Chess} from "./Chess";
import {GameBoard} from "./GameBoard";

export class TilesBoard extends Board<any> {

    readonly size: number

    constructor(scene: Phaser.Scene, readonly levelConfig: LevelConfig, gameBoard: GameBoard) {
        const gameWidth = scene.game.config.width as number
        const size = levelConfig.size
        super(scene, TilesBoardViewConfig.getGridConfig(size, gameWidth))

        this.size = size
        TilesBoardViewConfig.drawBoard(this)

        this.createBlocks(levelConfig.shift, gameBoard)
    }

    private createBlocks(shift: number, gameBoard: GameBoard) {
        for (let i = 0; i < this.size; i++) {
            new Chess(gameBoard, this, i + 1, i, 0, shift)
        }
    }
}