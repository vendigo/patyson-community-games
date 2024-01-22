import Phaser from "phaser";
import MoveTo from "phaser3-rex-plugins/plugins/behaviors/moveto/MoveTo";
import {Actor} from "./Actor";
import Point = Phaser.Geom.Point;

export enum BoatState {
    UP, DOWN
}

const MOVE_SPEED = 1500
const BOAT_Z = 0
const EMPTY_LENGTH = 0
const FULL_LENGTH = 2

export class Boat extends Phaser.GameObjects.Container {

    readonly config: BoatConfig

    state: BoatState
    actors: Actor[] = []

    private move: MoveTo | undefined
    private pos1: Actor | null = null
    private readonly xShift
    private readonly yShift

    constructor(scene: Phaser.Scene, config: BoatConfig) {
        const initialState = BoatState.UP
        const initialPosition = config.positions.get(initialState) as Point

        const boat = scene.add.image(0, 0, 'boat')
            .setDepth(BOAT_Z)
            .setScale(config.scale)
        super(scene, 0, 0, [boat]);

        this.xShift = boat.displayWidth / 2
        this.yShift = boat.displayHeight / 2
        const {x, y} = this.shiftPosition(initialPosition)
        this.x = x
        this.y = y
        this.config = config
        this.state = initialState
        this.setDepth(BOAT_Z)
        scene.add.existing(this)
    }

    changeState(state: BoatState) {
        if (this.move && this.move.isRunning) return

        this.state = state
        const p = this.config.positions.get(this.state) as Point

        this.move = new MoveTo(this, {speed: MOVE_SPEED})
        this.move.moveTo(this.shiftPosition(p))
    }

    addActor(actor: Actor) {
        if (!this.pos1) {
            this.pos1 = actor
            this.actors.push(actor)
            return this.config.actor1Position
        }

        this.actors.push(actor)
        return this.config.actor2Position
    }

    removeActor(actor: Actor) {
        this.remove(actor)
        this.actors = this.actors.filter(a => a != actor)
        if (this.pos1 == actor) {
            this.pos1 = null
        }
    }

    isNotFull() {
        return this.actors.length < FULL_LENGTH
    }

    isNotEmpty() {
        return this.actors.length > EMPTY_LENGTH
    }

    private shiftPosition(p: { x: number, y: number }) {
        return {x: p.x + this.xShift, y: p.y - this.yShift}
    }
}

export interface BoatConfig {
    scale: number
    positions: Map<BoatState, Point>
    actor1Position: Point
    actor2Position: Point
}