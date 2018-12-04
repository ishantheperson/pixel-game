class PixelFactory {
  public static NewPixel(pos: Vector2, type: PixelType) {
    switch (type) {
      case PixelType.Empty:
        return null;

      case PixelType.Block:
        return new BlockPixel(pos);

      case PixelType.Sand:
        return new SandPixel(pos);

      case PixelType.Water:
        return new WaterPixel(pos);

      case PixelType.Magma:
        return new MagmaPixel(pos);

      case PixelType.Clone:
        return new ClonePixel(pos);

      case PixelType.Oil:
        return new OilPixel(pos);

      case PixelType.Fuse:
        return new FusePixel(pos);

      case PixelType.Stone:
        return new StonePixel(pos);

      case PixelType.Portal:
        return new PortalPixel(pos);

      default:
        throw new TypeError("Unknown PixelType " + type);
    }
  }
}
