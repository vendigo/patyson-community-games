import ConfirmDialog from "phaser3-rex-plugins/templates/ui/confirmdialog/ConfirmDialog";
import Dialog from "phaser3-rex-plugins/templates/ui/dialog/Dialog";

const COLOR_PRIMARY = 0xE8DBC5;
const COLOR_DARKER = 0x606060;
const COLOR_DARK = 0x000000;
const COLOR_LIGHT = 0xFFFFFF;

const MODAL_CONFIG: any = {
    x: 500, y: 800,
    width: 900,
    space: {left: 20, right: 20, top: 20, bottom: 20, content: 20, action: 20},
    background: {
        color: COLOR_PRIMARY,
        strokeColor: COLOR_LIGHT,
        radius: 20,
    },
    content: {
        space: {left: 10, right: 10, top: 10, bottom: 200},
        text: {
            color: COLOR_DARK,
            fontFamily: 'Arial',
            fontSize: '60px'
        }
    },
    buttonMode: 1,
    button: {
        space: {left: 40, right: 80, top: 20, bottom: 60},
        background: {
            color: COLOR_DARKER,
            strokeColor: COLOR_LIGHT,
            radius: 20,
        },
        text: {
            fontFamily: 'Arial',
            fontSize: '48px'
        }
    },
    align: {
        actions: 'center'
    },
}

export class DialogService {

    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene
    }

    show(message: string): Promise<Dialog.CloseEventDataType | Dialog> {
        const dialog = new ConfirmDialog(this.scene, MODAL_CONFIG)
            .layout()
            .resetDisplayContent({
                content: message,
                buttonA: 'Ok'
            })
        this.scene.add.existing(dialog)
        return dialog.modalPromise()
    }
}