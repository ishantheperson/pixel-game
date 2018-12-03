/**
 * Default (blank) pixel.
 * Can only be represented with null
 */
abstract class Pixel {
  /**
   * Returns true if (a) can move into (b)
   * Basically means switch places
   * @param a
   * @param b
   */
  public static CanMoveInto(a: Pixel, b: Pixel): boolean {
    return b === null ||
      (!b.IsStatic() && b.GetFluidViscosity() < a.GetFluidViscosity());
  }

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
   * Particle velocity
   */
  public Velocity: Vector2 = { x: 0, y: 0 };
  
  // public Acceleration: Vector2 = { x: 0, y: 0 };

  /**
   * Initializes pixel
   * @param pos Pixel Position
   * @constructor
   */
  constructor(pos: Vector2) {
    this.Position = pos;
  }
  
  /**
   * Updates this pixel
   * Resolves velocity
   * @param world Game world (for physics)
   */
  public Update(world: World): void {
    this.DidUpdate = true;
    //#region Physics
    if (this.IsStatic()) return;

    this.ApplyForce(World.Gravity);

    let y = this.Velocity.y;
    let x = this.Velocity.x;
    
    // Resolve y component
    while (y !== 0) {
      const dir = { x: this.Position.x, y: this.Position.y + (y < 0 ? -1 : 1) };
      if (Pixel.CanMoveInto(this, world.GetPixel(dir))) {
        y += y < 0 ? 1 : -1;
        world.Swap(this.Position, dir);
      }
      
      else {
        this.Velocity.y = 0;
        break;
      }
    }
    // Resolve x component
    while (x !== 0) {
      const dir = { x: this.Position.x + (x < 0 ? -1 : 1), y: this.Position.y };
      if (Pixel.CanMoveInto(this, world.GetPixel(dir))) {
        x += x < 0 ? 1 : -1;
        world.Swap(this.Position, dir);
      }
      else {
        this.Velocity.x = 0;  
        break;
      }
    }    
    //#endregion
  }
  
  public ApplyForce(force: Vector2): void {
    this.Velocity.x += Math.floor(force.x / this.GetWeight());
    this.Velocity.y += Math.floor(force.y / this.GetWeight());
  }
  
  /**
   * Represents whether this pixel
   * is not affected by physics calculations
   */
  public IsStatic(): boolean {
    return true;
  }
  
  /**
   * How hard is it to destroy this.
   * Lower is easier
   */
  public GetDurability(): number {
    return PixelDurabilities.Default;
  }
  
  public GetWeight(): number {
    return PixelWeights.Default;
  }
  
  /**
   * Used to figure out which liquids go on top of others
   * MAX_INT represents it's not a liquid
   */
  public GetFluidViscosity(): number {
    return Number.MAX_SAFE_INTEGER;
  }
  
  /**
   * Gets the render color for this pixel
   */
  public abstract GetColor(): string;
  
  /**
   * Returns this pixel's type
   */
  public abstract GetType(): PixelType;
}
