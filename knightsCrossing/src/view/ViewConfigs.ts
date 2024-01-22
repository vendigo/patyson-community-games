import {ActorColor, ActorConfig, ActorState, ActorType} from "../component/Actor";
import {BoatConfig, BoatState} from "../component/Boat";
import Point = Phaser.Geom.Point;

const LINES_Y = [460, 725, 1485, 1750]
const COLUMNS_X = [220, 485, 745]
const KNIGHT_SCALE = 0.3
const SERVANT_SCALE = 0.3

const RED_KNIGHT_CONFIG: ActorConfig = {
    type: ActorType.KNIGHT,
    color: ActorColor.RED,
    scale: KNIGHT_SCALE,
    positions: new Map([
        [ActorState.UP, new Point(COLUMNS_X[0], LINES_Y[0])],
        [ActorState.DOWN, new Point(COLUMNS_X[0], LINES_Y[2])]
    ])
}
const RED_SERVANT_CONFIG: ActorConfig = {
    type: ActorType.SERVANT,
    color: ActorColor.RED,
    scale: SERVANT_SCALE,
    positions: new Map([
        [ActorState.UP, new Point(COLUMNS_X[0], LINES_Y[1])],
        [ActorState.DOWN, new Point(COLUMNS_X[0], LINES_Y[3])]
    ])
}
const GREEN_KNIGHT_CONFIG: ActorConfig = {
    type: ActorType.KNIGHT,
    color: ActorColor.GREEN,
    scale: KNIGHT_SCALE,
    positions: new Map([
        [ActorState.UP, new Point(COLUMNS_X[1], LINES_Y[0])],
        [ActorState.DOWN, new Point(COLUMNS_X[1], LINES_Y[2])]
    ])
}
const GREEN_SERVANT_CONFIG: ActorConfig = {
    type: ActorType.SERVANT,
    color: ActorColor.GREEN,
    scale: SERVANT_SCALE,
    positions: new Map([
        [ActorState.UP, new Point(COLUMNS_X[1], LINES_Y[1])],
        [ActorState.DOWN, new Point(COLUMNS_X[1], LINES_Y[3])]
    ])
}
const BLUE_KNIGHT_CONFIG: ActorConfig = {
    type: ActorType.KNIGHT,
    color: ActorColor.BLUE,
    scale: KNIGHT_SCALE,
    positions: new Map([
        [ActorState.UP, new Point(COLUMNS_X[2], LINES_Y[0])],
        [ActorState.DOWN, new Point(COLUMNS_X[2], LINES_Y[2])]
    ])
}
const BLUE_SERVANT_CONFIG: ActorConfig = {
    type: ActorType.SERVANT,
    color: ActorColor.BLUE,
    scale: SERVANT_SCALE,
    positions: new Map([
        [ActorState.UP, new Point(COLUMNS_X[2], LINES_Y[1])],
        [ActorState.DOWN, new Point(COLUMNS_X[2], LINES_Y[3])]
    ])
}


export const BOAT_CONFIG: BoatConfig = {
    scale: 0.5,
    positions: new Map([
        [BoatState.UP, new Point(10, 970)],
        [BoatState.DOWN, new Point(10, 1400)]
    ]),
    actor1Position: new Point(-200, 0),
    actor2Position: new Point(30, 0)
}

export const ACTOR_CONFIGS = [RED_KNIGHT_CONFIG, RED_SERVANT_CONFIG, GREEN_KNIGHT_CONFIG, GREEN_SERVANT_CONFIG,
BLUE_KNIGHT_CONFIG, BLUE_SERVANT_CONFIG]