import Board from "phaser3-rex-plugins/plugins/board/board/Board";
import Phaser from "phaser";
import {LevelConfig} from "../config/LevelConfig";
import {BoardViewConfigs} from "./BoardViewConfigs";
import {Chess} from "./Chess";

export class GameBoard extends Board<any> {

    readonly size: number

    constructor(scene: Phaser.Scene, readonly levelConfig: LevelConfig, readonly onWin: () => void) {
        const gameWidth = scene.game.config.width as number
        const size = levelConfig.size
        super(scene, BoardViewConfigs.getGridConfig(size, gameWidth))

        this.size = size
        BoardViewConfigs.drawBoard(this)

        this.createBlocks(levelConfig)
    }

    private createBlocks(levelConfig: LevelConfig) {
        this.forEachTileXY((xy) => {
            const v = levelConfig.field[xy.y][xy.x]

            if (v != null) {
                new Chess(this, null, v, xy.x, xy.y, levelConfig.shift)
            }
        })
    }

    checkWin() {
        if (this.isWin()) {
            this.onWin()
        }
    }

    private isWin(): boolean {
        const arr = this.asMatrix()
        return this.isSolvedSudoku(arr)
    }

    private asMatrix(): number[][] {
        const arr: number[][] = []

        this.forEachTileXY((xy) => {
            const chess: Chess = this.tileXYZToChess(xy.x, xy.y, 0)
            if (arr[xy.y] == null) {
                arr[xy.y] = []
            }
            arr[xy.y][xy.x] = chess?.getData('chessValue') || null
        })
        return arr
    }

    private isSolvedSudoku(field: number[][]): boolean {
        const n = field.length

        // Check that all cells are not null
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (field[i][j] === null) {
                    return false;
                }
            }
        }

        // Check that all numbers in each row are unique
        for (let i = 0; i < n; i++) {
            const row = field[i];
            const set = new Set(row);
            if (set.size !== n) {
                return false;
            }
        }

        // Check that all numbers in each column are unique
        for (let j = 0; j < n; j++) {
            const column = [];
            for (let i = 0; i < n; i++) {
                column.push(field[i][j]);
            }
            const set = new Set(column);
            if (set.size !== n) {
                return false;
            }
        }

        // Check that all numbers in each block are unique
        const blockW = n == 6 ? 3 :Math.sqrt(n);
        const blockH = n == 6 ? 2 : Math.sqrt(n);

        for (let blockX = 0; blockX < blockH; blockX++) {
            for (let blockY = 0; blockY < blockW; blockY++) {
                const block = [];
                for (let x = 0; x < blockW; x++) {
                    for (let y = 0; y < blockH; y++) {
                        const absX = blockX * blockW + x
                        const absY = blockY * blockH + y
                        block.push(field[absY][absX]);
                    }
                }
                const set = new Set(block);
                if (set.size !== n) {
                    return false;
                }
            }
        }

        // All checks passed, the sudoku is solved
        return true;
    }

}