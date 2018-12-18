type AddPixelHookHandler = (location: Vector2, world: World) => void;

/**
 * Abstract view of the game world
 */
class World {
  public static Gravity: Vector2 = { x: 0, y: 20 };
  public static AirResistance: Vector2 = { x: 0, y: 0 };

  public static OnAddPixelHooks: AddPixelHookHandler[] = [];

  private readonly size: Vector2; // store for easy of access
  private readonly board: Pixel[][];
  
  private numPixels: number = 0;
  
  public constructor(size: Vector2) {
    this.size = size;
    
    // Initialize empty board
    this.board = Array(size.y);
    for (let y = 0; y < size.y; y++) {
      this.board[y] = Array(size.x);
      for (let x = 0; x < size.x; x++) {
        this.board[y][x] = null;
      }
    }
  }
  
  /**
   * Adds a new pixel to the board, possibly
   * replacing it (if then new pixel is a block)
   * Does nothing if a pixel is already there
   * or if the passed position is out of bounds
   * @param pos Position to add
   * @param type Pixel type
   */
  public AddPixel(pos: Vector2, type: PixelType): Pixel {
    if (0 <= pos.y && pos.y < this.size.y
          && 0 <= pos.x && pos.x < this.size.x) {
            const pixel = PixelFactory.NewPixel(pos, type);
            // Block pixels can overwrite 
            if (pixel instanceof BlockPixel) this.DeletePixel(pos);

            if (this.board[pos.y][pos.x] === null) {
              this.board[pos.y][pos.x] = pixel;
              World.OnAddPixelHooks.forEach((func: AddPixelHookHandler) => func(pos, this));
              this.numPixels++;
              return this.board[pos.y][pos.x];
            }
        }
  }
  
  /**
   * Gets pixel at specified location,
   * returning `PixelType.Block` if out of bounds
   * @param pos Location from top left
   * @returns Pixel requested
   */
  public GetPixel(pos: Vector2): Pixel {
    if (0 <= pos.y && pos.y < this.size.y
          && 0 <= pos.x && pos.x < this.size.x)
        return this.board[pos.y][pos.x];
    
    // Out of bounds
    return PixelFactory.NewPixel(pos, PixelType.Block);
  }

  /**
   * Gets pixel at specified location, 
   * returning `null` if out of bounds
   * @param pos Location from top left
   * @returns Pixel requested, or `null` if out of bounds
   */
  public GetPixelNull(pos: Vector2): Pixel {
    if (0 <= pos.y && pos.y < this.size.y
      && 0 <= pos.x && pos.x < this.size.x)
    return this.board[pos.y][pos.x];

    // Out of bounds
    return null;
  }
  
  /**
   * Deletes a pixel for sure
   * @param pos Position of the pixel to delete
   */
  public DeletePixel(pos: Vector2): void {
    if (this.board[pos.y][pos.x] !== null) {
      this.numPixels--;
      this.board[pos.y][pos.x] = null;
    }
  }

  /**
   * Attempts to destroy a pixel using the durability system
   * @param pos Position of the pixel to delete
   * @param sourceDurability Durability of the pixel doing the destroying
   * @returns True if successfully destroyed
   */
  public DestroyPixel(pos: Vector2, sourceDurability: number): boolean {
    if (0 <= pos.y && pos.y < this.size.y
          && 0 <= pos.x && pos.x < this.size.x
          && this.board[pos.y][pos.x] !== null
          && sourceDurability > this.board[pos.y][pos.x].GetDurability()
          && Chance(sourceDurability - this.board[pos.y][pos.x].GetDurability())) {
        this.DeletePixel(pos);
        return true;
    }
    
    return false;
  }
  
  public ApplyForce(location: Vector2, force: Vector2) {
    const pixel = this.board[location.y][location.x];
    if (pixel !== null) pixel.ApplyForce(force);
  }

  /**
   * Creates an explosion centered at a given location
   * @param location Explosion center
   * @param size Pixels to extend the explosion
   * @param magnitude Explosion force
   * @param destroy Indicates whether to destroy the center pixel
   */
  public Explode(location: Vector2, size: number = 60, magnitude: number = 150, destroy: boolean = true) {
    if (destroy) this.DeletePixel(location);
  
    for (let y = -size; y <= size; y++) {
      for (let x = -size; x <= size; x++) {
        const pixel = this.GetPixel({ x: location.x + x, y: location.y + y });
        if (pixel !== null) {
          const norm = Math.hypot(x, y);
          pixel.ApplyForce({
            x: Math.floor(x * magnitude / norm), 
            y: Math.floor(y * magnitude / norm) 
          });
        }
      }
    }
  }
  
  public UseTool(location: Vector2, type: ToolType): void {
    ToolFactory.GetTool(type).Apply(location, this);
  }
  
  /**
   * Swaps the Pixels at pos1, pos2 (i.e. move from pos1 to pos2) 
   * and updates their positions
   */
  public Swap(pos1: Vector2, pos2: Vector2): void {
    const temp = this.board[pos1.y][pos1.x];
    this.board[pos1.y][pos1.x] = this.board[pos2.y][pos2.x];
    this.board[pos2.y][pos2.x] = temp;
    
    const a = this.board[pos1.y][pos1.x];
    const b = this.board[pos2.y][pos2.x];
    if (a != null) a.SetPosition({ ...pos1 });
    if (b != null) b.SetPosition({ ...pos2 });
  }
  
  /**
   * Updates all pixels on the board
   */
  public UpdateAll(): void {
    // Reset all particle update states
    for (let y = 0; y < this.size.y; y++) {
      for (let x = 0; x < this.size.x; x++) {
        if (this.board[y][x] != null) {
          this.board[y][x].DidUpdate = false;
        }
      }
    }
    
    for (let y = 0; y < this.size.y; y++) {
      for (let x = 0; x < this.size.x; x++) {
        const pixel = this.board[y][x];
        if (pixel == null || pixel.DidUpdate) continue;

        pixel.Update(this);
      }
    }
  }
  
  /**
   * Renders all pixels in the board
   * @param render Graphics method to render an individual pixel
   */
  public RenderAll(render: (pos: Vector2, color: string) => void): void {
    for (let y = 0; y < this.size.y; y++)
      for (let x = 0; x < this.size.x; x++) 
        if (this.board[y][x] != null)
          render({ x, y}, this.board[y][x].GetColor());
  }

  public GetNumPixels(): number {
    return this.numPixels;
  }
}
