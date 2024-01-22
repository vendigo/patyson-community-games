import Phaser from 'phaser'
import {DialogService} from "./service/DialogService";
import {WinReportingService} from "./service/WinReportingService";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import {Actor} from "./component/Actor";
import {Boat} from "./component/Boat";
import {ACTOR_CONFIGS, BOAT_CONFIG} from "./view/ViewConfigs";
import {MoveButton} from "./component/MoveButton";
import {CrossRiverGame} from "./game/CrossRiverGame";

export const GAME_NAME = "knightsCrossing"
export const BACKGROUND_Z = -2
export const RESOURCES_TO_LOAD = ['back', 'boat', 'knightRed', 'servantRed',
    'knightBlue', 'servantBlue', 'knightGreen', 'servantGreen']

export default class MainScene extends Phaser.Scene {
    // @ts-ignore
    rexUI: RexUIPlugin;

    private dialogService = new DialogService(this)
    private winReportingService = new WinReportingService(this.dialogService)
    private alreadyWon = false
    // @ts-ignore
    private actors: Actor[]

    constructor() {
        super(GAME_NAME)
    }

    preload() {
        RESOURCES_TO_LOAD.forEach(resource => this.load.image(resource, `assets/${resource}.png`))
    }

    create() {
        this.add.image(0, 0, 'back')
            .setOrigin(0)
            .setDepth(BACKGROUND_Z)

        this.actors = ACTOR_CONFIGS.map(config => new Actor(this, config))
        const boat = new Boat(this, BOAT_CONFIG)
        const game = new CrossRiverGame(this.actors, boat)

        const moveButton = new MoveButton(this)
        moveButton.setEnable(false)
        moveButton.addOnClickListener(() => game.moveBoat())
        this.actors.forEach(actor => actor.on('pointerdown', () => this.processMove(game, actor, moveButton)))
    }

    private processMove(game: CrossRiverGame, actor: Actor, moveButton: MoveButton) {
        if (this.animationInProgress()) {
            return
        }

        const {crossPossible, isWon} = game.tryMoveActor(actor);
        if (!this.alreadyWon && isWon) {
            this.alreadyWon = true
            this.winReportingService.reportWin().then()
            return
        }

        moveButton.setEnable(crossPossible)
    }

    private animationInProgress() {
        return this.actors.some(actor => actor.isAnimationRunning())
    }
}
