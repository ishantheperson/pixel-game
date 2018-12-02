enum PixelType {
  Empty,
  Block,
  Sand,
  Water // Glitchy
}

/**
 * Default (blank) pixel
 */
class Pixel {
  /**
   * Prevents recalculations
   */
  public DidUpdate: boolean = false;
  
  /**
   * Particle position.
   * Used for physics calculations (e.g. get neighbors)
   */
  protected position: Vector2;
  
  /**
   * Used for forces physics calculations
   */
  protected weight: number = NaN; // Doesn't participate in physics
  
  
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
   * Represents whether this pixel
   * is not affected by physics calculations
   */
  IsStatic(): boolean {
    return true;
  }
  
  /**
   * Gets the render color for this pixel
   */
  GetColor(): string {
    return "white"; // background color
  }
  
  GetType(): PixelType {
    return PixelType.Empty;
  }
}
