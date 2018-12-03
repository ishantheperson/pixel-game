///<reference path="../Pixel.ts"/>

/**
 * Basic sand pixel.
 */
class SandPixel extends Pixel {
  public Update(world: World): void {
    super.Update(world);
  }
  
  public IsStatic(): boolean {
    return false;
  }

  public GetColor(): string {
    return PixelColors.Sand;
  }
  
  public GetType(): PixelType {
    return PixelType.Sand;
  }
}
