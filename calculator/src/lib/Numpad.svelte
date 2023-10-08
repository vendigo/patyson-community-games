<script lang="ts">
    import Button from "./Button.svelte";
    import {CLR} from "./GameModel";
    import {createEventDispatcher} from "svelte";

    export let actions: string[];

    let buttons = [
        actions[0], CLR,
        actions[1], actions[3],
        actions[2], actions[4],
    ];
    let dispatch = createEventDispatcher();

    function onClick(type: string) {
        dispatch('click', type);
    }
</script>

<div class="numpad">
    {#each buttons as type}
        {#if type}
            <Button {type} on:click={() => onClick(type)}/>
        {:else}
            <div class="placeholder"></div>
        {/if}
    {/each}
</div>

<style>
    .numpad {
        padding-top: 3vh;
        display: grid;
        height: 40vh;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-gap: 2.5vh;
    }

    .placeholder {
        background-color: #B6B0A4;
        border-radius: 10px;
    }
</style>