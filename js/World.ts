/**
 * Abstract view of the game world
 */
class World {
  private size: Vector2; // store for easy of access
  private board: Pixel[][]; // probably will make a World class
  
  constructor(size: Vector2) {
    // Initialize empty board
    this.board = [];
    for (let y = 0; y < size.y; y++) {
      this.board.push([]);
      for (let x = 0; x < size.x; x++) {
        this.board[y].push(new Pixel({ x: x, y: y }));
      }
    }
  }
  
  RenderAll(renderMethod: (pos: Vector2, color: string) => void): void {
    for (let y = 0; y < this.size.y; y++) {
      for (let x = 0; x < this.size.x; x++) {
        if (this.board[y][x].GetType() == PixelType.Empty) continue;
        
        renderMethod({x: x, y: y}, this.board[y][x].GetColor()); // TODO
      }
    }
  }
  
  GetSize(): Vector2 {
    return this.size;
  }
}