/// <reference path="Block.ts" />

class FusePixel extends BlockPixel {
  public GetType(): PixelType {
    return PixelType.Fuse;
  }

  public GetColor(): string {
    return PixelColors.Fuse;
  }
}
