/// <reference path="../Tool.ts" />

/**
 * Uses flood fill algorithm to delete many blocks at once.
 * Diagonal doesn't count as connected for now
 */
class FloodEraserTool extends Tool {
  public Apply(location: Vector2, world: World): void {
    const startPixel = world.GetPixelNull(location);
    if (startPixel === null) return;

    Pixel.FloodFillSearch(startPixel.GetPosition(), world, (pos) => {
      world.DeletePixel(pos);
      return false;
    });
  }
}
