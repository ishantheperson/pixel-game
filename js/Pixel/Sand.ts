///<reference path="../Pixel.ts"/>

/**
 * Basic sand pixel
 */
class SandPixel extends Pixel {
  Update(world: World): void {
    this.DidUpdate = true;
  
    const below = { x: this.Position.x, y: this.Position.y + 1 };
    const belowPixel = world.GetPixel(below);
    
    if (belowPixel === null || belowPixel.GetFluidViscosity() > 0) {
      world.Swap({ ...this.Position }, below); // TODO: notify new pixel of movement
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
