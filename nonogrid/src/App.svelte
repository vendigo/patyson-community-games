<script lang="ts">
    import Board from "./lib/Board.svelte";
    import type {LevelInfo} from "./lib/GameModel";
    import {PatysonClient} from "./lib/patysonClient";
    import Modal from "./lib/Modal.svelte";

    const patysonClient = new PatysonClient();

    let level: LevelInfo;
    let modal: Modal;

    fetch('level.json')
        .then((response) => response.json())
        .then((levelInfo) => {
            level = levelInfo;
        });

    async function onWin() {
        const winMessage = await patysonClient.getWinMessage();
        modal.show(winMessage);
    }

</script>

<main>
    {#if level}
        <Board {level} on:win={onWin}/>
    {/if}
    <Modal bind:this={modal}/>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
    }
</style>
