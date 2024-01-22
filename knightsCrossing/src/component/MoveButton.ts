import Buttons from "phaser3-rex-plugins/templates/ui/buttons/Buttons";
import MainScene from "../MainScene";
import IConfig = Buttons.IConfig;

export class MoveButton extends Buttons {
    constructor(scene: MainScene) {
        super(scene, MoveButton.createConfig(scene));
        scene.add.existing(this);
        this.layout()
    }

    addOnClickListener(onClick: () => void) {
        this.on('button.click', (button: any) => {
            button.scaleYoyo(150, 0.9)
            onClick()
        })
    }

    setEnable(enable: boolean) {
        this.setButtonEnable(0, enable)
        this.setAlpha(enable ? 1 : 0.5)
    }

    private static createConfig(scene: MainScene): IConfig {
        return {
            x: 870,
            y: 1050,
            buttons: [
                MoveButton.createButton(scene),
            ]
        }
    }

    private static createButton(scene: MainScene) {
        return scene.rexUI.add.label({
            width: 220,
            height: 120,
            background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x176990),
            text: scene.add.text(0, 0, 'Плисти', {
                fontSize: "36px",
                fontFamily: "Arial"
            }),
            space: {
                left: 10,
                right: 10,
            },
            align: 'center',
            name: 'Move'
        });
    }
}