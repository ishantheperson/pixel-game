///<reference path="../Pixel.ts"/>

/**
 * Basic sand pixel
 */
class SandPixel extends Pixel {
  Update(world: World): void {
    this.DidUpdate = true;
  
    const below = { x: this.position.x, y: this.position.y + 1 };
    
    if (world.GetPixel(below) === PixelType.Empty) {
      world.Swap({ ...this.position }, below);
      this.position.y++;
    }
  }
  
  IsStatic(): boolean {
    return false;
  }

  GetColor(): string {
    return "#ffc22d"; // yellow ish
  }
  
  GetType(): PixelType {
    return PixelType.Sand;
  }
}
