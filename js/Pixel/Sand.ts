///<reference path="../Pixel.ts"/>

/**
 * Basic sand pixel
 */
class SandPixel extends Pixel {
  Update(world: World): void {
    const below = { x: this.position.x, y: this.position.y + 1 };
    
    if (world.GetPixel(below) == null) {
      world.Swap({ ...this.position }, below);
      this.position.y++;
    }
    
    this.DidUpdate = true;
  }
  
  IsStatic(): boolean {
    return true;
  }
  
  GetColor(): string {
    return "#ffc22d"; // yellow ish
  }
  
  GetType(): PixelType {
    return PixelType.Sand;
  }
}
