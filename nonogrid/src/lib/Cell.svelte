<script lang="ts">
    import {CellType} from "./GameModel";
    import {createEventDispatcher} from "svelte";

    export let type: CellType;
    export let row: number;
    export let col: number;
    export let win: boolean;

    $: image = type === CellType.MARKED ? "marked.png" : null;
    $: color = type === CellType.FULL ? "black" : "white";

    const dispatch = createEventDispatcher();

    function clicked() {
        if (win) return;

        switch (type) {
            case CellType.EMPTY:
                type = CellType.FULL;
                break;
            case CellType.FULL:
                type = CellType.MARKED;
                break;
            case CellType.MARKED:
                type = CellType.EMPTY;
        }

        dispatch('click', {row, col, type});
    }
</script>

<button on:click={clicked} style="--color: {color}">
    {#if image}
        <img src="{image}">
    {:else}
    {/if}
</button>


<style>
    img {
        text-align: center;
        width: 100%;
    }

    button {
        width: 100%;
        height: 100%;
        appearance: none;
        border: none;
        background: var(--color);
        box-shadow: 0 0 0 1px black;
    }
</style>