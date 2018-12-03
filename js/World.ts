/**
 * Abstract view of the game world
 */
class World {
  public static Gravity: Vector2 = { x: 0, y: 20 };
  public static AirResistance: Vector2 = { x: 0, y: 0 };

  private readonly size: Vector2; // store for easy of access
  private readonly board: Pixel[][];
  
  public constructor(size: Vector2) {
    this.size = size;
    
    // Initialize empty board
    this.board = [];
    for (let y = 0; y < size.y; y++) {
      this.board.push([]);
      for (let x = 0; x < size.x; x++) {
        this.board[y][x] = null;
      }
    }
  }
  
  /**
   * Adds a new pixel to the board.
   * Does nothing if a pixel is already there
   * @param pos Position to add
   * @param type Pixel type
   */
  public AddPixel(pos: Vector2, type: PixelType): void {
    if (this.board[pos.y][pos.x] == null)
      this.board[pos.y][pos.x] = PixelFactory.NewPixel(pos, type);
  }
  
  /**
   * Gets pixel at specified location
   * @param pos Location from top left
   * @returns Pixel requested
   */
  public GetPixel(pos: Vector2): Pixel {
    if (0 <= pos.y && pos.y < this.size.y
       && 0 <= pos.x && pos.x < this.size.x )
      return this.board[pos.y][pos.x];
    
    // Out of bounds
    return PixelFactory.NewPixel(pos, PixelType.Block);
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
          && sourceDurability > this.board[pos.y][pos.x].GetDurability()) {
      this.board[pos.y][pos.x] = null;
      return true;
    }
    
    return false;
  }
  
  public ApplyForce(location: Vector2, force: Vector2) {
    const pixel = this.board[location.y][location.x];
    if (pixel !== null) pixel.ApplyForce(force);
  }
  
  public UseTool(location: Vector2, type: ToolType): void {
    ToolFactory.GetTool(type).Apply(location, this);
  }
  
  /**
   * Swaps the Pixels at pos1, pos2 (i.e. move from pos1 to pos2)
   * Updates their positions
   */
  public Swap(pos1: Vector2, pos2: Vector2): void {
    const temp = this.board[pos1.y][pos1.x];
    this.board[pos1.y][pos1.x] = this.board[pos2.y][pos2.x];
    this.board[pos2.y][pos2.x] = temp;
    
    const a = this.board[pos1.y][pos1.x];
    const b = this.board[pos2.y][pos2.x];
    if (a != null) a.Position = { ...pos1 };
    if (b != null) b.Position = { ...pos2 };
  }
  
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
        if (pixel == null) continue;
        if (pixel.DidUpdate) continue;
        
        pixel.Update(this);
      }
    }
  }
  
  /**
   * Renders all pixels in the board
   * @param render Graphics method to render an individual pixel
   */
  public RenderAll(render: (pos: Vector2, color: string) => void): void {
    for (let y = 0; y < this.size.y; y++) {
      for (let x = 0; x < this.size.x; x++) {
        if (this.board[y][x] != null)
          render({ x, y}, this.board[y][x].GetColor());
      }
    }
  }
}
