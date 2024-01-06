import {CellType} from "./GameModel";
import type {LevelInfo} from "./GameModel";

export function isGameCompleted(grid: CellType[][], level: LevelInfo): boolean {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const vertical = level.vertical;
    const horizontal = level.horizontal;

    // Check rows
    for (let row = 0; row < numRows; row++) {
        if (!isRowOk(grid, row, horizontal[row])) {
            return false;
        }
        console.log(`Row ${row} is ok`);
    }

    // Check columns
    for (let col = 0; col < numCols; col++) {
        if (!isColumnOk(grid, col, vertical[col])) {
            return false;
        }
        console.log(`Column ${col} is ok`);
    }

    return true;
}

function isRowOk(grid: CellType[][], row: number, numbers: number[]): boolean {
    const numCols = grid[0].length;
    const rowPattern = [];
    let consecutiveFullCount = 0;

    for (let col = 0; col < numCols; col++) {
        if (grid[row][col] === CellType.FULL) {
            consecutiveFullCount++;
        } else {
            if (consecutiveFullCount > 0) {
                rowPattern.push(consecutiveFullCount);
                consecutiveFullCount = 0;
            }
        }
    }

    if (consecutiveFullCount > 0) {
        rowPattern.push(consecutiveFullCount);
    }

    return JSON.stringify(rowPattern) === JSON.stringify(numbers);
}

function isColumnOk(grid: CellType[][], col: number, numbers: number[]): boolean {
    const numRows = grid.length;
    const colPattern = [];
    let consecutiveFullCount = 0;

    for (let row = 0; row < numRows; row++) {
        if (grid[row][col] === CellType.FULL) {
            consecutiveFullCount++;
        } else {
            if (consecutiveFullCount > 0) {
                colPattern.push(consecutiveFullCount);
                consecutiveFullCount = 0;
            }
        }
    }

    if (consecutiveFullCount > 0) {
        colPattern.push(consecutiveFullCount);
    }

    return JSON.stringify(colPattern) === JSON.stringify(numbers);
}