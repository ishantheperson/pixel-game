/// <reference path="../Tool.ts" />

/**
 * Uses flood fill algorithm to delete many blocks at once.
 * Diagonal doesn't count as connected for now
 */
class FloodEraserTool extends Tool {
  public Apply(location: Vector2, world: World): void {
    const startPixel = world.GetPixelNull(location);
    if (startPixel === null) return;

    const stack: Vector2[] = [ location ];
    const type = startPixel.GetType();

    while (stack.length !== 0) {
      const current = stack.pop();
      const currentPixel = world.GetPixelNull(current);
      if (currentPixel !== null && currentPixel.GetType() === type) {
        world.DeletePixel(current);

        const left = { x: current.x - 1, y: current.y };
        const right = { x: current.x + 1, y: current.y };
        const up = { x: current.x, y: current.y - 1 };
        const down = { x: current.x, y: current.y + 1 };

        stack.push(left, right, up, down);
      }
    }
  }
}
