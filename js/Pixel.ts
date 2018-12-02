/**
 * Default (blank) pixel
 * Can only be represented with null
 */
abstract class Pixel {
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
   * @constructor
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
   * How hard is it to destroy this
   * Lower is easier
   */
  GetDurability(): number {
    return PixelDurabilities.Default;
  }
  
  /**
   * Used to figure out which liquids go on top of others
   * MAX_INT represents it's not a liquid
   */
  GetFluidViscosity(): number {
    return Number.MAX_SAFE_INTEGER;
  }
  
  /**
   * Gets the render color for this pixel
   */
  abstract GetColor(): string;
  
  abstract GetType(): PixelType;
  
  /**
   * Returns true if (a) can move into (b)
   * @param a
   * @param b
   */
  static CanMoveInto(a: Pixel, b: Pixel): boolean {
    return b === null ||
      (!b.IsStatic() && b.GetFluidViscosity() < a.GetFluidViscosity());
  }
}
