class BlockPixel extends Pixel {
  GetType(): PixelType {
    return PixelType.Block;
  }
  
  GetColor(): string {
    return "gray";
  }
}