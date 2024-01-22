import Phaser from "phaser";
import MoveTo from "phaser3-rex-plugins/plugins/behaviors/moveto/MoveTo";
import {Boat} from "./Boat";
import Point = Phaser.Geom.Point;

export enum ActorState {
    UP, DOWN, BOAT
}

export enum ActorType {
    KNIGHT = 'knight',
    SERVANT = 'servant'
}

export enum ActorColor {
    RED = 'Red',
    GREEN = 'Green',
    BLUE = 'Blue'
}

const MOVE_SPEED = 1500
const BOAT_ACTOR_Z = -1
const GROUND_ACTOR_Z = 0

export class Actor extends Phaser.GameObjects.Image {

    readonly config: ActorConfig

    state: ActorState

    private move: MoveTo | undefined

    constructor(scene: Phaser.Scene, config: ActorConfig) {
        const initialState = ActorState.UP
        const type = config.type
        const initialPosition = config.positions.get(initialState) as Point
        const textureName = type + config.color

        super(scene, initialPosition.x, initialPosition.y, textureName);

        this.config = config
        this.state = initialState
        this.setScale(config.scale)
            .setOrigin(0, 1)
            .setInteractive()
        scene.add.existing(this)
        this.setDepth(GROUND_ACTOR_Z)
    }

    changeState(state: ActorState, boat: Boat) {
        this.move = new MoveTo(this, {speed: MOVE_SPEED})

        if (state == ActorState.BOAT) {
            const p = boat.addActor(this)
            if (this.state == ActorState.UP) this.setDepth(BOAT_ACTOR_Z)
            this.state = state
            this.move.moveTo({x: boat.x + p.x, y: boat.y + p.y})
            this.move.on('complete', () => {
                boat.addAt(this, BOAT_ACTOR_Z)
                this.x = p.x
                this.y = p.y
            })
            return
        }

        if (state == ActorState.DOWN) this.setDepth(GROUND_ACTOR_Z)
        this.state = state
        boat.removeActor(this)
        const p = this.config.positions.get(state) as Point
        this.x += boat.x
        this.y += boat.y
        this.move.moveTo({x: p.x, y: p.y})
    }

    isAnimationRunning() {
        return this.move && this.move.isRunning
    }
}

export interface ActorConfig {
    type: ActorType
    color: ActorColor
    scale: number
    positions: Map<ActorState, Point>
}