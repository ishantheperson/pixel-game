/// <reference path="../Tool.ts" />

class AttractTool extends Tool {
  public Apply(location: Vector2, world: World) {
    world.Explode(location, ToolConstants.Attract.Size, -ToolConstants.Attract.Strength, false);
  }
}
