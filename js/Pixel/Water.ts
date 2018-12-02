class WaterPixel extends Pixel {
  constructor(pos: Vector2) {
    super(pos);
  }
  
  GetType(): PixelType {
    return PixelType.Water;
  }
  
  GetColor(): string {
    return "blue";
  }
}