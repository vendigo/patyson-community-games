<script lang="ts">
    import type {LevelInfo} from "./GameModel";
    import {CellType} from "./GameModel";
    import Cell from "./Cell.svelte";
    import {createEventDispatcher} from "svelte";
    import {isGameCompleted} from "./WinLogic";

    export let level: LevelInfo;

    const vertical = pivotArray(level.vertical);
    const horizontal = normalizeArrays(level.horizontal);
    const size = level.vertical.length
    const totalVertical = normalizeArrays(level.vertical)[0].length + size;
    const horizontalSize = horizontal[0].length;
    const horizontalIndices = Array.from({length: horizontalSize}, (_, index) => index);
    const totalHorizontal = horizontalSize + size;

    const dispatch = createEventDispatcher();
    let field = buildField();
    let win = false;

    function buildField(): CellType[][] {
        const grid: CellType[][] = [];

        for (let row = 0; row < size; row++) {
            const gridRow: CellType[] = [];

            for (let col = 0; col < size; col++) {
                gridRow.push(CellType.EMPTY);
            }

            grid.push(gridRow);
        }

        return grid;
    }

    function clicked({detail}) {
        if (win) return;

        field[detail.row][detail.col] = detail.type;
        const isCompleted = isGameCompleted(field, level);
        if (isCompleted) {
            win = true;
            dispatch('win');
        }
    }

    function normalizeArrays(arrays: number[][]) {
        const maxLength = arrays.reduce((max, arr) => Math.max(max, arr.length), 0);
        return arrays.map(arr => {
            const paddingCount = maxLength - arr.length;
            const paddingArray = new Array(paddingCount).fill(null);
            return [...paddingArray, ...arr];
        });
    }

    function pivotArray(inputArray: number[][]): number[][] {
        const normalized = normalizeArrays(inputArray);
        const numRows = normalized[0].length;
        const numCols = normalized.length;

        return Array.from({length: numRows}, (_, rowIndex) => {
            return Array.from({length: numCols}, (_, colIndex) => {
                return normalized[colIndex][rowIndex];
            });
        });
    }

</script>


<div class="board" style="--cellsH: {totalHorizontal}; --cellsV: {totalVertical}">

    {#each vertical as vRow}
        {#each horizontalIndices as _}
            <div></div>
        {/each}
        {#each vRow as vNumber}
            <div class="hnumber">
                {vNumber || ""}
            </div>
        {/each}
    {/each}

   {#each horizontal as hNumbers, row}
        {@const fieldRow = field[row]}
        {#each hNumbers as hNumber}
            <div class="hnumber">
                {hNumber || ""}
            </div>
        {/each}

        {#each fieldRow as type, col}
            <div>
                <Cell {type} on:click={clicked} {row} {col} {win}/>
            </div>
        {/each}
    {/each}
</div>

<style>
    .board {
        margin-top: 100px;
        --size: min(95vw, 500px);
        width: var(--size);
        height: var(--size);
        display: grid;
        grid-template-columns: repeat(var(--cellsH), 1fr);
        grid-template-rows: repeat(var(--cellsV), 1fr);
        grid-gap: 1px;
    }

    .hnumber {
        font-weight: bold;
        font-size: 1em;
        text-align: center;
    }
</style>


