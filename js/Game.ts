const PIXEL_SIZE = 2;

/**
 * Does the gritty graphics stuff
 */
class Game {
  private size: Vector2;
  private world: World;
  
  private gameLoopInterval: number;
  private context: CanvasRenderingContext2D;
  
  private isMouseDown: boolean;
  private currentType: PixelType = PixelType.Sand;
  
  constructor(size: Vector2, context: CanvasRenderingContext2D) {
    this.size = size;
    this.context = context;
    this.world = new World({ x: size.x / PIXEL_SIZE, y: size.y / PIXEL_SIZE });
    
    // <editor-fold desc="Register event handlers">
    
    // Handles switching PixelTypes
    document.getElementById("elemSelect").addEventListener("click", (event) => {
      if ((<Element>event.target).tagName === "P") {
        document.querySelector(".selected").classList.remove("selected");
        (<Element>event.target).classList.add("selected");
        
        const newType = (<HTMLElement>event.target).innerText;
        
        this.currentType = PixelType[newType];
        if (this.currentType == undefined) {
          throw new Error("unknown PixelType " + newType);
        }
      }
    });
  
    this.context.canvas.addEventListener("mouseup", () => {
      this.isMouseDown = false;
    });
  
    this.context.canvas.addEventListener("mousedown", (event: MouseEvent) => {
      this.isMouseDown = true;
      this.AddPixel(event.offsetX, event.offsetY);
    });
    

    this.context.canvas.addEventListener("mousemove", (event) => {
      if (this.isMouseDown) this.AddPixel(event.offsetX, event.offsetY);
    });
    // </editor-fold>
    
    this.gameLoopInterval = setInterval(() => {
      this.Render();
    }, 1000 / 60);
  }
  
  AddPixel(x: number, y: number) {
    this.world.AddPixel({ x: Math.floor(x / PIXEL_SIZE), y: Math.floor(y / PIXEL_SIZE) }, this.currentType);
  }
  
  Render() {
    this.context.clearRect(0, 0, this.size.x, this.size.y);
    
    this.world.RenderAll(((pos: Vector2, color: string) => {
      this.context.fillStyle = color;
      this.context.fillRect(pos.x * PIXEL_SIZE, pos.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
    }));
  }
}