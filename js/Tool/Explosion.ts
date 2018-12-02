class ExplosionTool extends Tool {
  static Apply(location: Vector2, world: World): void {
    world.DestroyPixel(location, Number.MAX_SAFE_INTEGER);
    
  }
}