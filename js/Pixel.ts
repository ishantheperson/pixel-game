enum PixelType {
  Empty,
  Block,
  Sand,
  Water
}

/**
 * Default (blank) pixel
 */
class Pixel {
  /**
   * Particle position.
   * Used for physics calculations (e.g. get neighbors)
   */
  protected position: Vector2;
  
  /**
   * Used for physics calculations
   */
  protected weight: number;
  
  /**
   * Returns a default pixel
   * @param pos Pixel position
   */
  constructor(pos: Vector2) {
    this.position = pos;
  }
  
  /**
   * Updates this pixel
   * @param world Game world (for physics)
   */
  Update(world: World): void {}
  
  /**
   * Gets the render color for this pixel
   */
  GetColor(): string {
    return "black";
  }
  
  GetType(): PixelType {
    return PixelType.Empty;
  }
}
