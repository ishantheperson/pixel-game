/**
 * Default (blank) pixel
 */
class Pixel {
  /**
   * Prevents recalculations
   */
  public DidUpdate: boolean = false;
  
  /**
   * Particle Position.
   * Used for physics calculations (e.g. get neighbors)
   */
  public Position: Vector2;
  
  /**
   * Used for forces physics calculations
   */
  protected weight: number = NaN; // Doesn't participate in physics
  
  
  /**
   * Returns a default pixel
   * @param pos Pixel Position
   */
  constructor(pos: Vector2) {
    this.Position = pos;
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
   * Used to figure out which liquids go on top of others
   * -1 represents it's not a liquid
   */
  GetFluidViscosity(): number {
    return Number.MAX_SAFE_INTEGER;
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
