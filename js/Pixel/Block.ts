class BlockPixel extends Pixel {
  public GetDurability(): number {
    return PixelDurabilities.Block;
  }
  
  public GetWeight(): number {
    return PixelWeights.Block;
  }
  
  public GetType(): PixelType {
    return PixelType.Block;
  }

  public GetColor(): string {
    return "gray";
  }
}
