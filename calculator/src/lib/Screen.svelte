<script lang="ts">
    export let moves: number;
    export let goal: number;
    export let displayedNumber: string;
    export let message: string;
</script>

<div class="screen-border">
    <div class="screen">
        <div class="sectors">
            <div class="sector">
                Ходів: {moves}
            </div>

            <div class="sector">
                Ціль: {goal}
            </div>
        </div>


        <div class="display">
            {displayedNumber}
        </div>

        <div class="message">
            {message}
        </div>
    </div>
</div>

<style>
    .screen-border {
        background-color: #373C40;
        border-radius: 20px;
        padding: 4vh 2vh;
    }

    .screen {
        background-color: #A6B8A2;
        border-radius: 20px;
        padding: 2vh;
    }

    .sectors {
        display: flex;
        justify-content: flex-end;
    }

    .sector {
        background-color: #3D3D3D;
        border-radius: 5px;
        margin-right: 10px;
        padding: 1vh 0.5vh;
        color: #A6B8A2;
        font-size: 1.5em;
    }

    .display {
        text-align: right;
        padding: 1vh;
        color: #3D3D3D;
        font-size: 5em;
    }

    .message {
        text-align: center;
        color: #3D3D3D;
        font-size: 1.5em;
    }
</style>
