const FPS = 30;
const PIXEL_SIZE = 4;

/**
 * Does the gritty graphics stuff
 */
class Game {
  private size: Vector2;
  private world: World;
  
  private gameLoopInterval: number;
  private context: CanvasRenderingContext2D;
  
  private mouseEvent: MouseEvent;
  private isMouseDown: boolean;
  
  private currentPixel: PixelType = PixelType.Sand;
  private currentTool: ToolType = ToolType.Explosion;
  
  constructor(size: Vector2, canvas: HTMLCanvasElement) {
    this.size = size;
    this.context = canvas.getContext("2d");
    this.world = new World({
      x: Math.floor(size.x / PIXEL_SIZE),
      y: Math.floor(size.y / PIXEL_SIZE) 
    });
    
    // <editor-fold desc="Register event handlers">
    
    // Handles switching tool/pixel types
    document.getElementById("items").addEventListener("click", (event) => {
      if ((<HTMLElement>event.target).tagName === "P") {
        const id = (<HTMLElement>event.target).parentElement.id;
        const newType = (<HTMLElement>event.target).innerText;
        
        if (id === "tools") {
          this.currentTool = ToolType[newType];
          if (this.currentTool === undefined) {
            throw new Error("Unknown ToolType " + newType);
          }
          
          document.querySelector("#tools .selected").classList.remove("selected");
        }
        else if (id === "elements") {
          this.currentPixel = PixelType[newType];
          if (this.currentPixel === undefined) {
            throw new Error("Unknown PixelType " + newType);
          }
          
          document.querySelector("#elements .selected").classList.remove("selected");
        }
        
        (<HTMLElement>event.target).classList.add("selected");
      }
    });
  
    // <editor-fold desc="Mouse">
    canvas.addEventListener("mouseup", () => {
      this.isMouseDown = false;
    });
  
    canvas.addEventListener("mousedown", (event: MouseEvent) => {
      this.mouseEvent = event;
      this.isMouseDown = true;
    });

    canvas.addEventListener("mousemove", (event: MouseEvent) => {
      this.mouseEvent = event;
    });
    // </editor-fold>
    
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "t") {
        this.UseTool(this.MouseToWorld());
      }
    });
    
    // </editor-fold>
    
    this.gameLoopInterval = setInterval(() => {
      if (this.isMouseDown)
        this.AddPixel(this.MouseToWorld());
      
      this.world.UpdateAll();
      this.Render();
    }, 1000 / FPS);
  }
  
  /**
   * Converts screen coordinates to scaled world coordinates
   */
  private MouseToWorld(): Vector2 {
    return {
      x: Math.floor(this.mouseEvent.offsetX / PIXEL_SIZE),
      y: Math.floor(this.mouseEvent.offsetY / PIXEL_SIZE)
    };
  }
  
  private AddPixel(worldPos: Vector2): void {
    this.world.AddPixel(worldPos, this.currentPixel);
  }
  
  private UseTool(worldPos: Vector2): void {
    this.world.UseTool(worldPos, this.currentTool);
  }
  
  private Render(): void {
    this.context.clearRect(0, 0, this.size.x, this.size.y);
    
    this.world.RenderAll(((pos: Vector2, color: string) => {
      this.context.fillStyle = color;
      this.context.fillRect(pos.x * PIXEL_SIZE, pos.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
    }));
  }
}
