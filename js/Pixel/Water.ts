/// <reference path="../Pixel.ts"/>

class WaterPixel extends Pixel {
  public Update(world: World): void {
    super.Update(world);
    
    // Affects liquid spread speed
    // Thicker liquids are slower
    // 0 -> left, 1 -> right, 2+ -> nothing
    const random = GetRandomInt(4 + (this.GetFluidViscosity() / PixelViscosities.Water));
    
    if (random === 1) {
      const left = { x: this.Position.x - 1, y: this.Position.y };
      
      if (world.GetPixel(left) === null) {
        world.Swap({ ...this.Position }, left);
      }
    }
    else if (random === 2) {
      const right = { x: this.Position.x + 1, y: this.Position.y };
      if (world.GetPixel(right) === null) {
        world.Swap({ ...this.Position }, right);
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
    return "blue";
  }
}
