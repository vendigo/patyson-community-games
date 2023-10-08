import {GameBoard} from "./GameBoard";
import {TilesBoard} from "./TilesBoard";
import {MiniBoard} from "phaser3-rex-plugins/plugins/board-components";
import {TileXYType} from "phaser3-rex-plugins/plugins/board/types/Position";

export const CELL_SIZE_RATIO = 2.3
export const MAX_SPRITES = 16

export class Chess extends MiniBoard {

    value: number
    private isTemplate

    constructor(readonly gameBoard: GameBoard, readonly tileBoard: TilesBoard | null, value: number,
                readonly initialX: number, readonly initialY: number, private readonly shift: number) {
        const scene = gameBoard.scene
        const isDraggable = tileBoard != null

        super(scene, 0, 0, {
            grid: gameBoard.grid,
            draggable: isDraggable,
        })

        this.value = value
        this.isTemplate = tileBoard != null

        const scale = CELL_SIZE_RATIO / gameBoard.size
        const sprite = scene.add.sprite(0, 0, 'animals', this.valueToSpriteNumber())
            .setScale(scale)
            .setData('chessValue', value)
        this.addChess(sprite, 0, 0, 0)
        this.putOnMainBoard(tileBoard || gameBoard, initialX, initialY)
        if (isDraggable) {
            this.addDragListener()
        }
    }

    private addDragListener() {
        let lastX = this.x
        let lastY = this.y

        this.on('drag', (_pointer: any, dragX: number, dragY: number) => {
            this.setPosition(dragX, dragY)
        })

        this.on('dragend', () => {
            const xy = this.gameBoard.worldXYToTileXY(this.x, this.y)
            const onBoard = this.onBoard(xy)
            const isFreeTile = this.gameBoard.tileXYZToChess(xy.x, xy.y, 0) == null

            if (onBoard && isFreeTile) {
                this.drop()
                lastX = this.x
                lastY = this.y
                return
            }

            if (!this.isTemplate && !onBoard) {
                this.getAllChildren().forEach((child) => {
                    this.removeChess(child, null, null, null, true)
                })
                return
            }

            this.setPosition(lastX, lastY)
        })
    }

    private drop() {
        this.pullOutFromMainBoard()
        this.putOnMainBoard(this.gameBoard)
        this.alignToMainBoard(this.gameBoard)

        if (this.isTemplate) {
            new Chess(this.gameBoard, this.tileBoard, this.value, this.initialX, this.initialY, this.shift)
            this.isTemplate = false
        }

        this.gameBoard.checkWin()
    }

    private onBoard(xy: TileXYType): boolean {
        return xy.x >= 0 && xy.x < this.gameBoard.size && xy.y >= 0 && xy.y < this.gameBoard.size
    }

    private valueToSpriteNumber(): number {
        return this.value - 1 + this.shift % MAX_SPRITES
    }
}