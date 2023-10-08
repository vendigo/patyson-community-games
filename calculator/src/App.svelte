<script lang="ts">
    import type {LevelInfo} from "./lib/GameModel";
    import {PatysonClient} from "./lib/patysonClient";
    import Calculator from "./lib/Calculator.svelte";

    const patysonClient = new PatysonClient();

    let level: LevelInfo;
    let message = "";

    fetch('level.json')
        .then((response) => response.json())
        .then((levelInfo) => {
            level = levelInfo;
        });

    async function onWin() {
        message = await patysonClient.getWinMessage();
    }

</script>

<main>
    {#if level}
        <Calculator {level} {message} on:win={onWin}/>
    {/if}
</main>

<style>
    main {
        display: flex;
        justify-content: center;
    }
</style>
