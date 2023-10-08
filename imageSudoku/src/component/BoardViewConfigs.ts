import Board from "phaser3-rex-plugins/plugins/board/board/Board";
import {GameBoard} from "./GameBoard";
import IConfig = Board.IConfig;
import {TilesBoard} from "./TilesBoard";

const BOARD_BACKGROUND_COLOR = 0xffffff
const BOARD_STROKE_COLOR = 0xaaaaaa
const SIDE_MARGIN_RATIO = 0.02
const TOP_MARGIN_RATIO = 0.15
const TOP_MARGIN_TILES_RATIO = 1.2
const TILES_GRAPHICS_CONFIG = {
    lineStyle: {
        width: 5,
        color: BOARD_STROKE_COLOR
    },
    fillStyle: {
        color: BOARD_BACKGROUND_COLOR
    }
}
const LINE_GRAPHICS_CONFIG = {
    lineStyle: {
        width: 8,
        color: BOARD_STROKE_COLOR
    }
}

export class BoardViewConfigs {
    static getGridConfig(size: number, gameWidth: number): IConfig {
        const sideMargin = gameWidth * SIDE_MARGIN_RATIO
        const topMargin = gameWidth * TOP_MARGIN_RATIO
        const boardSize = gameWidth - 2 * sideMargin
        const cellSize = boardSize / size
        const x = sideMargin + cellSize / 2
        const y = topMargin + cellSize / 2

        return {
            grid: {
                gridType: 'quadGrid',
                x,
                y,
                cellWidth: cellSize,
                cellHeight: cellSize,
                type: 'orthogonal',
            },
            width: size,
            height: size
        }
    }

    static drawBoard(gameBoard: GameBoard) {
        const cellsGraphics = gameBoard.scene.add.graphics(TILES_GRAPHICS_CONFIG)
        const sectsGraphics = gameBoard.scene.add.graphics(LINE_GRAPHICS_CONFIG)

        gameBoard.forEachTileXY((tileXY) => {
            const points = gameBoard.getGridPoints(tileXY.x, tileXY.y, true)
            cellsGraphics.strokePoints(points, true)
            cellsGraphics.fillPoints(points, true)
        })

        if (gameBoard.size == 4 || gameBoard.size == 9) {
            BoardViewConfigs.drawSectors4and9(gameBoard, sectsGraphics)
        } else {
            BoardViewConfigs.drawSectors6(gameBoard, sectsGraphics)
        }
    }

    private static drawSectors4and9(gameBoard: GameBoard, sectsGraphics: Phaser.GameObjects.Graphics) {
        const sect = Math.sqrt(gameBoard.size)
        for (let i = sect; i < gameBoard.size; i += sect) {
            for (let j = 0; j < gameBoard.size; j++) {
                const vertCellsPoints = gameBoard.getGridPoints(i, j, true);
                sectsGraphics.lineBetween(vertCellsPoints[3].x, vertCellsPoints[3].y, vertCellsPoints[2].x, vertCellsPoints[2].y)

                const horCellsPoints = gameBoard.getGridPoints(j, i, true);
                sectsGraphics.lineBetween(horCellsPoints[3].x, horCellsPoints[3].y, horCellsPoints[0].x, horCellsPoints[0].y)
            }
        }
    }

    private static drawSectors6(gameBoard: GameBoard, sectsGraphics: Phaser.GameObjects.Graphics) {
        for (let j = 0; j < gameBoard.size; j++) {
            const vertCellsPoints = gameBoard.getGridPoints(3, j, true);
            sectsGraphics.lineBetween(vertCellsPoints[3].x, vertCellsPoints[3].y, vertCellsPoints[2].x, vertCellsPoints[2].y)
        }

        for (let i = 2; i <= 4; i += 2) {
            for (let j = 0; j < gameBoard.size; j++) {
                const horCellsPoints = gameBoard.getGridPoints(j, i, true);
                sectsGraphics.lineBetween(horCellsPoints[3].x, horCellsPoints[3].y, horCellsPoints[0].x, horCellsPoints[0].y)
            }
        }
    }
}

export class TilesBoardViewConfig {
    static getGridConfig(size: number, gameWidth: number): IConfig {
        const sideMargin = gameWidth * SIDE_MARGIN_RATIO
        const topMargin = gameWidth * TOP_MARGIN_TILES_RATIO
        const boardSize = gameWidth - 2 * sideMargin
        const cellSize = boardSize / size
        const x = sideMargin + cellSize / 2
        const y = topMargin + cellSize / 2

        return {
            grid: {
                gridType: 'quadGrid',
                x,
                y,
                cellWidth: cellSize,
                cellHeight: cellSize,
                type: 'orthogonal',
            },
            width: size,
            height: 1
        }
    }

    static drawBoard(gameBoard: TilesBoard) {
        const cellsGraphics = gameBoard.scene.add.graphics(TILES_GRAPHICS_CONFIG)

        gameBoard.forEachTileXY((tileXY) => {
            const points = gameBoard.getGridPoints(tileXY.x, tileXY.y, true)
            cellsGraphics.strokePoints(points, true)
            cellsGraphics.fillPoints(points, true)
        })
    }
}