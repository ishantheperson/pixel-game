/**
 * Basic sand pixel
 */
class SandPixel extends Pixel {
  constructor(pos: Vector2) {
    super(pos);
  }
  
  GetColor(): string {
    return "#ffc22d"; // yellow ish
  }
  
  GetType(): PixelType {
    return PixelType.Sand;
  }
}
