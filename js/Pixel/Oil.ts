/// <reference path="Water.ts" />

class OilPixel extends WaterPixel {
  public Update(world: World): void {
    super.Update(world);

    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        const pixel = world.GetPixel({ x: this.Position.x + x, y: this.Position.y + y });
        if (pixel !== null && pixel.GetType() === PixelType.Magma) {
          // React with magma, produce an explosion here
          // Delete magma
          console.log("Explosion");
          world.DestroyPixel(pixel.Position, Number.MAX_SAFE_INTEGER);
          ToolFactory.GetTool(ToolType.Explosion).Apply(this.Position, world);
        }
      }
    }
  }

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
