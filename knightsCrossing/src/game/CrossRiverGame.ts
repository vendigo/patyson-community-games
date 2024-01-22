import {Actor, ActorState, ActorType} from "../component/Actor";
import {Boat} from "../component/Boat";

export class CrossRiverGame {

    // @ts-ignore
    private readonly actors: Actor[]
    private readonly boat: Boat

    constructor(actors: Actor[], boat: Boat) {
        this.actors = actors
        this.boat = boat
    }

    //Boat is occupied -> No move
    tryMoveActor(actor: Actor): MoveResult {
        if (this.actorAndBoatSameSide(actor) && this.boat.isNotFull()) { //Move to boat
            actor.changeState(ActorState.BOAT, this.boat)
        } else if (actor.state == ActorState.BOAT) { //Moving out of boat
            actor.changeState(this.boat.state.valueOf(), this.boat)
        }

        return {crossPossible: this.isCrossPossible(), isWon: this.isWon()}
    }

    moveBoat() {
        this.boat.changeState(1 - this.boat.state)
    }

    private actorAndBoatSameSide(actor: Actor) {
        return actor.state.valueOf() == this.boat.state.valueOf()
    }

    private isWon() {
        return this.actors.every(actor => actor.state == ActorState.DOWN)
    }

    private isCrossPossible() {
        const actorsOnGround = this.actors.filter(actor => this.actorAndBoatSameSide(actor))
        const actorsInBoat = this.boat.actors
        return this.boat.isNotEmpty() && this.servantsSafe(actorsOnGround) && this.servantsSafe(actorsInBoat)
    }

    private servantsSafe(actors: Actor[]): boolean {
        const knights = actors.filter(actor => actor.config.type == ActorType.KNIGHT)
            .map(actor => actor.config.color)
        const lonelyServants = actors.filter(actor => actor.config.type == ActorType.SERVANT)
            .map(actor => actor.config.color)
            .filter(servantColor => !knights.includes(servantColor))
        return lonelyServants.length === 0 || knights.length === 0
    }
}

export interface MoveResult {
    crossPossible: boolean
    isWon: boolean
}