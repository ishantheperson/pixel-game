/// <reference path="Water.ts" />

/**
 * Magma pixel. 
 * Destroys anything it touches.
 * Reacts with oil to form explosions
 */
class MagmaPixel extends WaterPixel {
  public Update(world: World): void {
    super.Update(world);
    
    // Destroy a neighbor
    let didDestroy = false;
    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        const pixel = world.GetPixel({  x: this.GetPosition().x + x, y: this.GetPosition().y + y });
        if (pixel !== null) {
          if (pixel.GetType() === PixelType.Oil) {
            world.DestroyPixel(this.GetPosition(), Number.MAX_SAFE_INTEGER);
            world.Explode(pixel.GetPosition(), 30, 60);
          } 
          else if (pixel.GetType() === PixelType.Fuse) {
            // TODO: explode the entire chain
            world.DestroyPixel(pixel.GetPosition(), Number.MAX_SAFE_INTEGER);
            world.Explode(pixel.GetPosition(), 30, 60);
          }
          else if (world.DestroyPixel(pixel.GetPosition(), this.GetDurability())) {
            didDestroy = true;
          }
        }
      }
    }
    if (didDestroy) world.DestroyPixel(this.GetPosition(), Number.MAX_SAFE_INTEGER);
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
