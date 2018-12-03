/// <reference path="../Tool.ts" />

class ExplosionTool extends Tool {
  public static Apply(location: Vector2, world: World): void {
    world.Explode(location);
  }
}
