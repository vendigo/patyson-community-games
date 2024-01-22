import Phaser from 'phaser'
import MainScene from './MainScene'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import MoveToPlugin from "phaser3-rex-plugins/plugins/moveto-plugin";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'app',
    width: 1000,
    height: 1800,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    plugins: {
        global: [{
            key: 'rexMoveTo',
            plugin: MoveToPlugin,
            start: true
        }],
        scene: [
            {
                key: 'rexUI',
                plugin: RexUIPlugin,
                mapping: 'rexUI'
            }
        ]
    },
    backgroundColor: "FFFFFF",
    scene: [MainScene]
}

export default new Phaser.Game(config)
