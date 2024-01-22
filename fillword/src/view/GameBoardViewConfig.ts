import Board from "phaser3-rex-plugins/plugins/board/board/Board";
import IConfig = Board.IConfig;

const SIDE_MARGIN_RATIO = 0.02
const TOP_MARGIN_RATIO = 0.15

export const TILES_GRAPHICS_CONFIG = {
    lineStyle: {
        width: 2,
        color: 0x000000
    }
}

export class GameBoardViewConfig {
    static getGridConfig(width: number, height: number, gameWidth: number): IConfig {
        const sideMargin = gameWidth * SIDE_MARGIN_RATIO
        const topMargin = gameWidth * TOP_MARGIN_RATIO
        const boardSize = gameWidth - 2 * sideMargin
        const cellSize = boardSize / width
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
            width: width,
            height: height
        }
    }
}