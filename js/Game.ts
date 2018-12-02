const PIXEL_SIZE = 2;

/**
 * Does the gritty graphics stuff
 */
class Game {
  private size: Vector2;
  private world: World;
  private context: CanvasRenderingContext2D;
  
  private isMouseDown: boolean;
  
  constructor(size: Vector2, context: CanvasRenderingContext2D) {
    this.size = size;
    this.context = context;
    this.world = new World({ x: size.x / PIXEL_SIZE, y: size.y / PIXEL_SIZE });
    
    // Register event handlers
    this.context.canvas.addEventListener("mousedown", () => {
      this.isMouseDown = true;
    });
    
    this.context.canvas.addEventListener("mouseup", () => {
      this.isMouseDown = false;
    });
    
    this.context.canvas.addEventListener("mousemove", (event) => {
      console.log(event);
    });
  }
  
  render() {
    this.context.clearRect(0, 0, this.size.x, this.size.y);
    
    this.world.RenderAll(((pos: Vector2, color: string) => {
      this.context.fillStyle = color;
      this.context.fillRect(pos.x, pos.y, PIXEL_SIZE, PIXEL_SIZE);
    }));
  }
}