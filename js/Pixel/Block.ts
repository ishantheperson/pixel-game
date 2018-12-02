class BlockPixel extends Pixel {
  GetDurability(): number {
    return PixelDurabilities.Block;
  }
  
  GetWeight(): number {
    return PixelWeights.Block;
  }
  
  GetType(): PixelType {
    return PixelType.Block;
  }
  
  GetColor(): string {
    return "gray";
  }
}