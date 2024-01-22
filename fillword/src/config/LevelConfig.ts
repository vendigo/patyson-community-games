export enum FindMode {
    ONLY_STRAIGHT = "ONLY_STRAIGHT",
    STRAIGHT_AND_DIAGONAL = "STRAIGHT_AND_DIAGONAL",
    BROKEN_LINE = "BROKEN_LINE"
}

export interface LevelConfig {
    mode: FindMode
    field: string[]
    words: string[]
}