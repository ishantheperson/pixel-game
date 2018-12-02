class PixelFactory {
  static NewPixel(pos: Vector2, type: PixelType) {
    switch (type) {
      case PixelType.Empty:
        return new Pixel(pos);
      case PixelType.Sand:
        return new SandPixel(pos);
        
      case PixelType.Water:
        return new WaterPixel(pos);
        
      default:
        throw new TypeError("Unknown PixelType " + type);
    }
  }
}