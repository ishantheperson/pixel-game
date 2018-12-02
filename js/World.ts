/**
 * Abstract view of the game world
 */
class World {
  private readonly size: Vector2; // store for easy of access
  private board: Pixel[][]; // probably will make a World class
  
  constructor(size: Vector2) {
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
  AddPixel(pos: Vector2, type: PixelType): void {
    if (this.board[pos.y][pos.x] == null)
      this.board[pos.y][pos.x] = PixelFactory.NewPixel(pos, type);
  }
  
  /**
   * Gets pixel type at specified location
   * @param pos Location from top left
   * @returns Pixel type requested
   */
  GetPixel(pos: Vector2): PixelType {
    if (0 <= pos.y && pos.y < this.size.y
       && 0 <= pos.x && pos.x < this.size.x )
      return this.board[pos.y][pos.x] === null
        ? PixelType.Empty : this.board[pos.y][pos.x].GetType();
    
    // Out of bounds
    return PixelType.Block;
  }
  
  ApplyForce(location: Vector2, magnitude: Vector2) {
    throw new Error("Not implemented yet")
  }
  
  UseTool(location: Vector2, type: ToolType): void {
    ToolFactory.GetTool(type).Apply(location, this);
  }
  
  /**
   * Swaps the Pixels at pos1, pos2 (i.e. move from pos1 to pos2)
   */
  Swap(pos1: Vector2, pos2: Vector2): void {
    const temp = this.board[pos1.y][pos1.x];
    this.board[pos1.y][pos1.x] = this.board[pos2.y][pos2.x];
    this.board[pos2.y][pos2.x] = temp;
  }
  
  UpdateAll(): void {
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
  RenderAll(render: (pos: Vector2, color: string) => void): void {
    for (let y = 0; y < this.size.y; y++) {
      for (let x = 0; x < this.size.x; x++) {
        //if (this.board[y][x].GetType() == PixelType.Empty) continue;
        if (this.board[y][x] == null) {
          //render({ x: x, y: y }, "black");
        }
        else
          render({x: x, y: y}, this.board[y][x].GetColor()); // TODO
      }
    }
  }
  
  GetSize(): Vector2 {
    return this.size;
  }
}