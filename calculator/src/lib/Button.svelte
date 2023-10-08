<script lang="ts">
    import {ActionType} from "./GameModel";
    import {parseAction} from "./Utils";

    export let type: string;

    let color = getColor(type);
    let shadowColor = darkenColor(color, 0.4);

    function getColor(type: string): string {
        let action = parseAction(type);

        switch (action.type) {
            case ActionType.CLEAR: return "#C62E2D";
            case ActionType.BACKSPACE: return "#EC6C15";
            case ActionType.INSERT_NUMBER: return "#8A7BD8";
            case ActionType.OPERATION: return "#45494C";
            case ActionType.REPLACE_NUMBER: return "#EC6C15";
        }
    }

    function darkenColor(hexColor, percentage) {
        // Remove the "#" symbol and split the hex color into red, green, and blue components
        const red = parseInt(hexColor.slice(1, 3), 16);
        const green = parseInt(hexColor.slice(3, 5), 16);
        const blue = parseInt(hexColor.slice(5, 7), 16);

        // Calculate the new darkened color components
        const darkenedRed = Math.round(red * (1 - percentage));
        const darkenedGreen = Math.round(green * (1 - percentage));
        const darkenedBlue = Math.round(blue * (1 - percentage));

        // Convert the darkened color components back to hex
        const darkenedHexColor =
            "#" +
            darkenedRed.toString(16).padStart(2, "0") +
            darkenedGreen.toString(16).padStart(2, "0") +
            darkenedBlue.toString(16).padStart(2, "0");

        return darkenedHexColor;
    }
</script>

<button class="button" style="--color: {color}; --shadowColor: {shadowColor}" on:click>
    {type}
</button>

<style>
    .button {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background-color: var(--color);
        color: #E4DCCF;
        font-size: 3em;
        outline: none;
        text-decoration: none;
        border: none;
        box-shadow: 0 10px var(--shadowColor)
    }

    .button:active {
        box-shadow: 0 2px var(--shadowColor);
        transform: translateY(8px);
    }
</style>