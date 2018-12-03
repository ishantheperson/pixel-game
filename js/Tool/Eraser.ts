/// <reference path="../Tool.ts" />

class Eraser extends Tool {
  public Apply(location: Vector2, world: World): void {
    const scale = PixelInsertScales.Block;

    for (let y = location.y; y < location.y + scale; y++)
      for (let x = location.x; x < location.x + scale; x++)
        world.DestroyPixel({ x, y }, Number.MAX_SAFE_INTEGER + 1);
  }
}
