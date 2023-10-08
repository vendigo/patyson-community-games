export class GeomUtils {
    static isIntersects(rect1: Phaser.Geom.Rectangle, rect2: Phaser.Geom.Rectangle): boolean {
        const intersect = Phaser.Geom.Rectangle.Intersection(rect1, rect2)
        const intersectSize = Phaser.Geom.Rectangle.GetSize(intersect)
        return intersectSize.x * intersectSize.y != 0
    }
}