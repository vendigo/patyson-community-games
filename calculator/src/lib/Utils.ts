import type {Action} from "./GameModel";
import {ActionType, BACKSPACE, CLR} from "./GameModel";

const INSERT_NUMBER_REGEX = /^\d+$/;
const OPERATION_REGEX = /^[+-x/] \d+$/;
const SWAP_NUMBERS_REGEX = /^\d+ => \d+$/;

export function parseAction(raw: string): Action {
    if (raw === CLR) return {type: ActionType.CLEAR};

    if (raw === BACKSPACE) return {type: ActionType.BACKSPACE};

    if (INSERT_NUMBER_REGEX.test(raw)) return {
        type: ActionType.INSERT_NUMBER,
        value1: parseInt(raw)
    };

    if (OPERATION_REGEX.test(raw)) {
        const [operation, operandRaw] = raw.split(" ");

        return {
            type: ActionType.OPERATION,
            operation,
            value1: parseInt(operandRaw)
        }
    }

    if (SWAP_NUMBERS_REGEX.test(raw)) {
        const [numFromRaw, numToRaw] = raw.split(" => ");
        return {
            type: ActionType.REPLACE_NUMBER,
            value1: parseInt(numFromRaw),
            value2: parseInt(numToRaw)
        }
    }
    throw new Error("Cant parse value: " + raw);
}