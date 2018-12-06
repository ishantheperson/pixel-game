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
   * Uses flood fill to search (or perform an action)
   * on all neighboring pixels of the same type.
   * @param location Location to start search
   * @param world World object
   * @param predicate Search predicate. If it returns true, the search stops
   */
  public static FloodFillSearch(location: Vector2, world: World, predicate: (position: Vector2) => boolean): void {
    const startPixel = world.GetPixelNull(location);
    if (startPixel === null) return;

    const stack: Vector2[] = [ location ];
    const type = startPixel.GetType();

    const visited: Vector2[] = [];
    while (stack.length !== 0) {
      const current = stack.pop();
      const currentPixel = world.GetPixelNull(current);
      if (currentPixel !== null && currentPixel.GetType() === type 
            && !visited.some((other: Vector2) => other.x === current.x && other.y === current.y)) {
        
        visited.push(current);
        if (predicate(current)) return;

        const left = { x: current.x - 1, y: current.y };
        const right = { x: current.x + 1, y: current.y };
        const up = { x: current.x, y: current.y - 1 };
        const down = { x: current.x, y: current.y + 1 };

        stack.push(left, right, up, down);
      }
    }
  }

  /**
   * Prevents recalculations
   */
  public DidUpdate: boolean = false;
  
  /**
   * Time since last teleportation
   */
  public TeleportCooldown: number = 0;

  /**
   * Particle Position.
   * Used for physics calculations (e.g. get neighbors)
   */
  private position: Vector2;
  
  /**
   * Particle velocity
   */
  private velocity: Vector2 = { x: 0, y: 0 };
  
  // public Acceleration: Vector2 = { x: 0, y: 0 };

  /**
   * Initializes pixel
   * @param pos Pixel Position
   * @constructor
   */
  constructor(pos: Vector2) {
    this.position = pos;
  }
  
  /**
   * Updates this pixel
   * Resolves velocity
   * @param world Game world (for physics)
   */
  public Update(world: World): void {
    this.DidUpdate = true;
    if (this.TeleportCooldown !== 0) --this.TeleportCooldown;

    //#region Physics
    if (this.IsStatic()) return;

    this.ApplyForce(World.Gravity);

    let y = this.velocity.y;
    let x = this.velocity.x;
    
    // Resolve y component
    while (Math.round(y) !== 0) {
      const dir = { x: this.GetPosition().x, y: this.GetPosition().y + (y < 0 ? -1 : 1) };
      if (Pixel.CanMoveInto(this, world.GetPixel(dir))) {
        y = y < 0 ? Math.min(0, y + 1) : Math.max(0, y - 1); // infinite loop
        world.Swap(this.GetPosition(), dir);
      }
      
      else {
        this.velocity.y = 0;
        break;
      }
    }
    // Resolve x component
    while (Math.round(x) !== 0) {
      const dir = { x: this.GetPosition().x + (x < 0 ? -1 : 1), y: this.GetPosition().y };
      if (Pixel.CanMoveInto(this, world.GetPixel(dir))) {
        x = x < 0 ? Math.min(0, x + 1) : Math.max(0, x - 1);
        world.Swap(this.GetPosition(), dir);
      }
      else {
        this.velocity.x = 0;  
        break;
      }
    }
    const airResistance = this.GetWeight() / PixelWeights.Default;
    this.velocity.x = this.velocity.x < 0 
      ? Math.min(0, this.velocity.x + airResistance) : Math.max(0, this.velocity.x - airResistance);    
    //#endregion
  }
  
  public ApplyForce(force: Vector2): void {
    this.velocity.x += force.x / this.GetWeight();
    this.velocity.y += force.y / this.GetWeight();
  }
  
  /**
   * Represents whether this pixel
   * is not affected by physics calculations
   */
  public IsStatic(): boolean {
    return true;
  }
  
  /**
   * Returns this pixel's position
   * in world coordinates 
   * (i.e.) integer part only
   */
  public GetPosition(): Vector2 {
    return {
      x: Math.floor(this.position.x),
      y: Math.floor(this.position.y)
    };
  }

  public SetPosition(val: Vector2): void {
    this.position = val;
  }

  /**
   * How hard is it to destroy this.
   * Lower is easier
   */
  public GetDurability(): number {
    return PixelDurabilities.Default;
  }

  /**
   * Returns pixel's weight
   */
  public GetWeight(): number {
    return PixelWeights.Default;
  }
  
  /**
   * Used to figure out which liquids go on top of others. 
   * Default represents it's not a liquid
   */
  public GetFluidViscosity(): number {
    return PixelViscosities.Default;
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
