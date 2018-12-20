/// <reference path="Block.ts" />

class FusePixel extends BlockPixel {
  public IsFlammable(): boolean {
    return true;
  }

  public GetType(): PixelType {
    return PixelType.Fuse;
  }

  public GetColor(): string {
    return PixelColors.Fuse;
  }
}
