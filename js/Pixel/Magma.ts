/// <reference path="Water.ts" />

class MagmaPixel extends WaterPixel {
  public Update(world: World): void {
    super.Update(world);
    
    // Destroy a neighbor
    let didDestroy = false;
    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        const pixel = world.GetPixel({  x: this.Position.x + x, y: this.Position.y + y });
        if (pixel !== null) {
          if (pixel.GetType() === PixelType.Oil) {
            world.DestroyPixel(pixel.Position, Number.MAX_SAFE_INTEGER);
            ToolFactory.GetTool(ToolType.Explosion).Apply(this.Position, world);  
          }
          if (world.DestroyPixel(pixel.Position, this.GetDurability())) {
            didDestroy = true;
          }
        }
      }
    }
    if (didDestroy) world.DestroyPixel(this.Position, Number.MAX_SAFE_INTEGER);
  }
  
  public GetDurability(): number {
    return PixelDurabilities.Magma;
  }
  
  public GetFluidViscosity(): number {
    return PixelViscosities.Magma;
  }
  
  public GetWeight(): number {
    return PixelWeights.Magma;
  }
  
  public GetColor(): string {
    return PixelColors.Magma;
  }
  
  public GetType(): PixelType {
    return PixelType.Magma;
  }
}
