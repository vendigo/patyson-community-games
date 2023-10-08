<script lang="ts">
    import type {Action, LevelInfo} from "./GameModel";
    import {ActionType} from "./GameModel";
    import Screen from "./Screen.svelte";
    import Numpad from "./Numpad.svelte";
    import {createEventDispatcher} from "svelte";
    import {parseAction} from "./Utils";

    export let level: LevelInfo;
    export let message: string;

    const dispatch = createEventDispatcher();

    let won = false;
    let value = level.initial;
    let moves = level.moves;
    let goal = level.goal;

    function onClick(e: CustomEvent<string>) {
        if (won) return;

        const action = parseAction(e.detail);

        switch (action.type) {
            case ActionType.CLEAR:
                reset();
                break;
            case ActionType.BACKSPACE:
                backspace();
                break;
            default:
                makeMove(action);
        }

        checkState();
    }

    function reset() {
        value = level.initial;
        moves = level.moves;
        message = "";
    }

    function backspace() {
        if (message) return;

        value = Math.floor(value / 10);
        moves--;
    }

    function makeMove(action: Action) {
        if (message) return;

        moves--;

        switch (action.type) {
            case ActionType.INSERT_NUMBER:
                insertNumber(action);
                break;
            case ActionType.REPLACE_NUMBER:
                replaceNumbers(action);
                break;
            case ActionType.OPERATION:
                makeOperation(action);
                break;
        }
    }

    function insertNumber(action: Action) {
        const numbers = action.value1.toString().length
        const multiplier = Math.pow(10, numbers);
        value = value * multiplier + action.value1;
    }

    function replaceNumbers(action: Action) {
        const valuesAsString = value.toString()
        const replaceFrom = action.value1.toString();

        if (!valuesAsString.includes(replaceFrom)) {
            moves++;
            return;
        }

        value = parseInt(valuesAsString.replace(replaceFrom, action.value2.toString()));
    }

    function makeOperation(action: Action) {
        switch (action.operation) {
            case "+":
                value += action.value1;
                break;
            case "-":
                value -= action.value1;
                break;
            case "x":
                value *= action.value1;
                break;
            case "/":
                value /= action.value1;
                if (value != parseInt(value.toString())) {
                    message = "Помилка";
                }
                break;
        }
    }

    function checkState() {
        if (value === goal) {
            dispatch("win");
            won = true;
            message = "Перемога.";
            return;
        }

        if (moves === 0) {
            message = "Закінчилися ходи."
        }
    }
</script>

<div class="calc">
    <Screen {moves} {goal} displayedNumber={value.toString()} {message}/>

    <Numpad actions={level.buttons} on:click={onClick}/>
</div>

<style>
    .calc {
        margin-top: 2vh;
        width: min(95vw, 500px);
    }

</style>


