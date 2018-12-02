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
   * Particle velocity
   */
  public Velocity: Vector2 = { x: 0, y: 0 };
  
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
  Update(world: World): void {
    this.DidUpdate = true;
    this.ApplyForce(World.Gravity);
    
    let y = this.Velocity.y;
    let x = this.Velocity.x;
    
    // Resolve y component
    while (y !== 0) {
      const dir = { x: this.Position.x, y: this.Position.y + (y < 0 ? -1 : 1)};
      if (Pixel.CanMoveInto(this, world.GetPixel(dir))) {
        y += y < 0 ? 1 : -1;
        world.Swap(this.Position, dir);
      }
      
      else break;
    }
    // Resolve x component
    while (x !== 0) {
      const dir = { x: this.Position.x, y: this.Position.y + (x < 0 ? -1 : 1)};
      if (Pixel.CanMoveInto(this, world.GetPixel(dir))) {
        x += x < 0 ? 1 : -1;
        world.Swap(this.Position, dir);
      }
      else break;
    }
    
    // Air resistance applies in all directions
    if (this.Velocity.x < 0)
      this.Velocity.x = Math.min(0, this.Velocity.x + World.AirResistance.x);
    else
      this.Velocity.x = Math.max(0, this.Velocity.x - World.AirResistance.x);
    
    if (this.Velocity.y < 0)
      this.Velocity.y = Math.min(0, this.Velocity.y + World.AirResistance.y);
    else
      this.Velocity.y = Math.max(0, this.Velocity.y - World.AirResistance.y);
  }
  
  ApplyForce(force: Vector2): void {
    this.Velocity.x += Math.floor(force.x / this.GetWeight());
    this.Velocity.y += Math.floor(force.y / this.GetWeight());
  }
  
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
  
  GetWeight(): number {
    return PixelWeights.Default;
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
   * Basically means switch places
   * @param a
   * @param b
   */
  static CanMoveInto(a: Pixel, b: Pixel): boolean {
    return b === null ||
      (!b.IsStatic() && b.GetFluidViscosity() < a.GetFluidViscosity());
  }
}
