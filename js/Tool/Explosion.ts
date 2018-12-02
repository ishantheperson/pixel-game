class ExplosionTool extends Tool {
  static Apply(location: Vector2, world: World): void {
    world.DestroyPixel(location, Number.MAX_SAFE_INTEGER);
  
    for (let y = -10; y <= 10; y++) {
      for (let x = -10; x <= 10; x++) {
        const pixel = world.GetPixel({ x: location.x + x, y: location.y + y });
        if (pixel !== null) {
          pixel.ApplyForce({x: x * 60, y: y * 60 });
        }
      }
    }
  }
}