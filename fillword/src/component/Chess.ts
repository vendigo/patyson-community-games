import Phaser from "phaser";
import {GameBoard} from "./GameBoard";

const TEXT_COLOR = "#000000"
const FONT_RATIO = 650
const BACK_SIZE_RATIO = 0.95
const EMPTY_COLOR = 0xffffff
const SELECTED_COLOR = 0x3DA2DC
const DONE_COLOR = 0x1FDC72

export class Chess extends Phaser.GameObjects.Container {

    chessState: ChessState
    private readonly back: Phaser.GameObjects.Rectangle

    constructor(board: GameBoard, readonly value: string) {
        const font = FONT_RATIO / board.fieldW
        const scene = board.scene

        const label = scene.add.text(0, 0, value.toUpperCase(),
            {fontSize: font + "px", fontFamily: "Arial", color: TEXT_COLOR})
            .setOrigin(0.5)
        const backSize = board.grid.width * BACK_SIZE_RATIO
        const back = scene.add.rectangle(0, 0, backSize, backSize, EMPTY_COLOR)

        super(scene, 0, 0, [back, label])
        this.chessState = ChessState.EMPTY
        this.back = back
        scene.add.existing(this)
    }

    select() {
        this.state = ChessState.SELECTED
        this.back.setFillStyle(SELECTED_COLOR)
    }

    unselect() {
        this.state = ChessState.EMPTY
        this.back.setFillStyle(EMPTY_COLOR)
    }

    markAsDone() {
        this.state = ChessState.DONE
        this.back.setFillStyle(DONE_COLOR)
    }
}

export enum ChessState {
    EMPTY, SELECTED, DONE
}