import Board from "phaser3-rex-plugins/plugins/board/board/Board";
import {TileXYType} from "phaser3-rex-plugins/plugins/board/types/Position";
import Phaser from "phaser";
import {Chess, ChessState} from "./Chess";
import {GameBoardViewConfig, TILES_GRAPHICS_CONFIG} from "../view/GameBoardViewConfig";
import {LevelConfig} from "../config/LevelConfig";

export class GameBoard extends Board<Chess> {

    private selection: TileXYType[] = []
    readonly fieldW: number

    constructor(scene: Phaser.Scene, readonly levelConfig: LevelConfig,
                private readonly onWin: () => void) {
        const gameWidth = scene.game.config.width as number
        const fieldW = levelConfig.field[0].length
        const fieldH = levelConfig.field.length
        super(scene, GameBoardViewConfig.getGridConfig(fieldW, fieldH, gameWidth))
        this.fieldW = fieldW

        this.drawBoard()
        this.createTiles(levelConfig.field)
        this.addListeners()
    }

    private drawBoard() {
        const graphics = this.scene.add.graphics(TILES_GRAPHICS_CONFIG)
        this.forEachTileXY((tileXY) => {
            const points = this.getGridPoints(tileXY.x, tileXY.y, true)
            graphics.strokePoints(points, true)
        })
    }

    private createTiles(field: string[]) {
        this.forEachTileXY((xy) => {
            const chess = new Chess(this, field[xy.y].charAt(xy.x))
            this.addChess(chess, xy.x, xy.y, 0)
        })
    }

    private addListeners() {
        this.setInteractive()
            .on('tiledown', (_pointer: any, tile: TileXYType) => this.startSelection(tile))
            .on('tilemove', (_pointer: any, tile: TileXYType) => this.continueSelection(tile))
            .on('tileup', () => this.endSelection())
            .on('board.pointerover', () => this.endSelection())
    }

    private startSelection(tile: TileXYType) {
        const chess = this.getChess(tile)
        chess.select()
        this.selection = [tile]
    }

    private continueSelection(tile: TileXYType) {
        if (this.selection.length == 0) return
        const chess = this.getChess(tile)

        if (this.canSelect(tile, chess)) {
            chess.select()
            this.selection.push(tile)
        }
    }

    private canSelect(tile: TileXYType, chess: Chess): boolean {
        if (chess.state == ChessState.SELECTED) return false
        return true
    }

    private endSelection() {
        this.selection = []

        if (this.isWin()) {
            this.onWin()
        }
    }

    private isWin() {
        return false
    }

    private getChess(tile: TileXYType): Chess {
        return this.tileXYZToChess(tile.x, tile.y, 0) as Chess
    }
}