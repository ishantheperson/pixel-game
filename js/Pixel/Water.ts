/// <reference path="../Pixel.ts"/>

/**
 * Basic liquid pixel.
 */
class WaterPixel extends Pixel {
  public Update(world: World): void {
    super.Update(world);
    
    // Affects liquid spread speed
    // Scales quadratically 
    // 0 -> left, 1 -> right, 2+ -> nothing
    const random = GetRandomInt(2 + (this.GetFluidViscosity() - PixelViscosities.Water) ** 2);
    
    if (random === 0) {
      const left = { x: this.GetPosition().x - 1, y: this.GetPosition().y };
      
      if (Pixel.CanMoveInto(this, world.GetPixel(left))) {
        world.Swap(this.GetPosition(), left);
      }
    }
    else if (random === 1) {
      const right = { x: this.GetPosition().x + 1, y: this.GetPosition().y };
      if (Pixel.CanMoveInto(this, world.GetPixel(right))) {
        world.Swap(this.GetPosition(), right);
      }
    }
  }

  public IsStatic(): boolean {
    return false;
  }
  
  public GetDurability(): number {
    return PixelDurabilities.Water;
  }
  
  public GetFluidViscosity(): number {
    return PixelViscosities.Water; // Water is the least viscous
  }
  
  public GetWeight(): number {
    return PixelWeights.Water;
  }
  
  public GetType(): PixelType {
    return PixelType.Water;
  }
  
  public GetColor(): string {
    return PixelColors.Water;
  }
}
