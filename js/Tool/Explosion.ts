const EXPLOSION_DISTANCE = 60;
const EXPLOSION_FORCE = 150;

class ExplosionTool extends Tool {
  public static Apply(location: Vector2, world: World): void {
    world.DestroyPixel(location, Number.MAX_SAFE_INTEGER);
  
    for (let y = -EXPLOSION_DISTANCE; y <= EXPLOSION_DISTANCE; y++) {
      for (let x = -EXPLOSION_DISTANCE; x <= EXPLOSION_DISTANCE; x++) {
        const pixel = world.GetPixel({ x: location.x + x, y: location.y + y });
        if (pixel !== null) {
          const norm = Math.hypot(x, y);
          pixel.ApplyForce({
            x: Math.floor(x * EXPLOSION_FORCE / norm), 
            y: Math.floor(y * EXPLOSION_FORCE / norm) 
          });
        }
      }
    }
  }
}
