/// <reference path="Water.ts" />

class OilPixel extends WaterPixel {
  public GetFluidViscosity(): number {
    return PixelViscosities.Oil;
  }

  public GetType(): PixelType {
    return PixelType.Oil;
  }

  public GetColor(): string {
    return PixelColors.Oil;
  }
}
