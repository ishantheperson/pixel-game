/// <reference path="../Tool.ts" />

class ExplosionTool extends Tool {
  public Apply(location: Vector2, world: World): void {
    world.Explode(location);
  }
}
