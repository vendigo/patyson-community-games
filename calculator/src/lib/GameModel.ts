export const CLR = "CLR";
export const BACKSPACE = "<<";

export enum ActionType {
    CLEAR,
    OPERATION,
    BACKSPACE,
    INSERT_NUMBER,
    REPLACE_NUMBER
}

export interface Action {
    type: ActionType;
    operation?: string;
    value1?: number;
    value2?: number;
}

export interface LevelInfo {
    moves: number;
    goal: number;
    initial: number;
    buttons: string[];
}