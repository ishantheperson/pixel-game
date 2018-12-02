class BlockPixel extends Pixel {
  GetDurability(): number {
    return PixelDurabilities.Block;
  }
  
  GetType(): PixelType {
    return PixelType.Block;
  }
  
  GetColor(): string {
    return "gray";
  }
}