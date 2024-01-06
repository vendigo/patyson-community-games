<script lang="ts">
    let dialog
    let message

    export function show(msg) {
        message = msg
        dialog.showModal()
    }
</script>

<dialog bind:this={dialog}>
    <article>
        <h3>{message}</h3>
    </article>
</dialog>

<style>
    dialog::backdrop {
        opacity: 80%;
        background-color: grey;
        backdrop-filter: blur(5px);
    }

    dialog {
        box-shadow: 10px 10px #646464;
        border-radius: 8px;
        border: none;
    }
</style>