///<reference path="../Pixel.ts"/>

/**
 * Basic sand pixel
 */
class SandPixel extends Pixel {
  Update(world: World): void {
    super.Update(world);
    // this.DidUpdate = true;
    //
    // const below = { x: this.Position.x, y: this.Position.y + 1 };
    // const belowPixel = world.GetPixel(below);
    //
    // if (Pixel.CanMoveInto(this, belowPixel)) {
    //   world.Swap({ ...this.Position }, below);
    // }
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
