export interface LevelInfo {
    horizontal: number[][];
    vertical: number[][];
}

export enum CellType {
    EMPTY,
    MARKED,
    FULL
}