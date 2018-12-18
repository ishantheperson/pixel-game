const FPS = 30;
const PIXEL_SIZE = 4;

/**
 * Does the gritty graphics stuff
 */
class Game {
  private size: Vector2;
  private world: World;
  
  private isPaused: boolean = false;
  private gameLoopInterval: number;
  private context: CanvasRenderingContext2D;
  
  private mouseEvent: MouseEvent;
  private isMouseDown: boolean = false; // left button
  private isMouseRightDown: boolean = false;
  private isShiftDown: boolean = false;
  
  private currentPixel: PixelType = PixelType.Sand;
  private currentTool: ToolType = ToolType.Eraser;

  private pixelCountElem: HTMLElement;
  
  constructor(size: Vector2, canvas: HTMLCanvasElement) {
    this.size = size;
    this.context = canvas.getContext("2d");
    this.world = new World({
      x: Math.floor(size.x / PIXEL_SIZE),
      y: Math.floor(size.y / PIXEL_SIZE) 
    });
    
    this.pixelCountElem = document.getElementById("pixelCount");

    //#region Register event handlers
    //#region Handles switching tool/pixel types
    document.getElementById("items").addEventListener("click", (event) => {
      if ((<HTMLElement>event.target).tagName === "P") {
        const id = (<HTMLElement>event.target).parentElement.parentElement.id;
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
    //#endregion
  
    //#region Mouse
    // This is on document so dragging outside the canvas
    // doesn't cause any funkiness
    document.addEventListener("mouseup", () => { 
      this.isMouseDown = false;
      this.isMouseRightDown = false;
    });
  
    canvas.addEventListener("mousedown", (event: MouseEvent) => {
      this.mouseEvent = event;
      this.isMouseDown = event.button === 0;
      this.isMouseRightDown = event.button === 2;
    });

    canvas.addEventListener("mousemove", (event: MouseEvent) => {
      this.mouseEvent = event;
    });
    //#endregion
    
    //#region Keyboard
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      this.isShiftDown = event.shiftKey;
      switch (event.key.toLowerCase()) {
        case "t":
          this.UseTool(this.MouseToWorld());
          break;

        case "p":
          this.isPaused = !this.isPaused;
          break;
      }
    });
    document.addEventListener("keyup", (event: KeyboardEvent) => {
      this.isShiftDown = event.shiftKey;
    });
    //#endregion
    //#endregion
    
    this.gameLoopInterval = setInterval(this.GameLoop.bind(this), 1000 / FPS);
  }
  
  private GameLoop(): void {
    if (this.isMouseDown) {
      if (this.isShiftDown)
        this.UseTool(this.MouseToWorld());
      else
        this.AddPixel(this.MouseToWorld());
    }
    if (this.isMouseRightDown) this.UseTool(this.MouseToWorld());

    if (!this.isPaused) this.world.UpdateAll();
    this.Render();
    this.DisplayStats();
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
    const scale = PixelInsertScales[PixelType[this.currentPixel]] || PixelInsertScales.Default;

    for (let y = worldPos.y; y < worldPos.y + scale; y++)
      for (let x = worldPos.x; x < worldPos.x + scale; x++)
        this.world.AddPixel({ x, y }, this.currentPixel);
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

  private DisplayStats(): void {
    this.pixelCountElem.innerHTML = this.world.GetNumPixels().toString();
  }
}
