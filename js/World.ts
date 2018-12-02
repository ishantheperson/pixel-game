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
   * Gets pixel at specified location
   * @param Location from top left
   * @returns Pixel requested
   */
  GetPixel(pos: Vector2): Pixel {
    if (!(0 <= pos.y && pos.y < this.size.y
       && 0 <= pos.x && pos.x < this.size.x ))
      return PixelFactory.NewPixel(pos, PixelType.Block);
    
    return this.board[pos.y][pos.x];
  }
  
  private swapStack = [];
  
  Swap(pos1: Vector2, pos2: Vector2) {
    this.swapStack.push(pos1, pos2);
  }
  
  UpdateAll(): void {
    this.swapStack = [];
    for (let y = 0; y < this.size.y; y++) {
      for (let x = 0; x < this.size.x; x++) {
        if (this.board[y][x] == null) continue;
        
        this.board[y][x].Update(this);
      }
    }
    
    while (this.swapStack.length !== 0) {
      const pos1 = this.swapStack.pop();
      const pos2 = this.swapStack.pop();
      
      const temp = this.board[pos1.y][pos1.x];
      this.board[pos1.y][pos1.x] = this.board[pos2.y][pos2.x];
      this.board[pos2.y][pos2.x] = temp;
    }
  }
  
  /**
   * Renders all pixels in the board
   * @param renderMethod Graphics method to render an individual pixel
   */
  RenderAll(renderMethod: (pos: Vector2, color: string) => void): void {
    for (let y = 0; y < this.size.y; y++) {
      for (let x = 0; x < this.size.x; x++) {
        //if (this.board[y][x].GetType() == PixelType.Empty) continue;
        if (this.board[y][x] == null) {
          renderMethod({ x: x, y: y }, "black");
        }
        else 
        renderMethod({x: x, y: y}, this.board[y][x].GetColor()); // TODO
      }
    }
  }
  
  GetSize(): Vector2 {
    return this.size;
  }
}