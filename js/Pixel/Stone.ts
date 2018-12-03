/// <reference path="Sand.ts" />

class StonePixel extends SandPixel {
  public GetDurability(): number {
    return PixelDurabilities.Stone;
  }

  public GetType(): PixelType {
    return PixelType.Stone;
  }

  public GetColor(): string {
    return PixelColors.Stone;
  }
}
