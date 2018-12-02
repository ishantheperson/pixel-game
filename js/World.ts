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
        //this.board[y].push(new Pixel({ x: x, y: y }));
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
   * Renders all pixels in the board
   * @param renderMethod
   * @constructor
   */
  RenderAll(renderMethod: (pos: Vector2, color: string) => void): void {
    for (let y = 0; y < this.size.y; y++) {
      for (let x = 0; x < this.size.x; x++) {
        //if (this.board[y][x].GetType() == PixelType.Empty) continue;
        if (this.board[y][x] == null) continue;
        
        renderMethod({x: x, y: y}, this.board[y][x].GetColor()); // TODO
      }
    }
  }
  
  GetSize(): Vector2 {
    return this.size;
  }
}