class BlockPixel extends Pixel {
  GetDurability(): number {
    return Number.MAX_SAFE_INTEGER;
  }
  
  GetType(): PixelType {
    return PixelType.Block;
  }
  
  GetColor(): string {
    return "gray";
  }
}