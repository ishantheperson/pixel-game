///<reference path="../Pixel.ts"/>

class WaterPixel extends Pixel {
  Update(world: World): void {
    super.Update(world);
    
    // Affects liquid spread speed
    // Thicker liquids are more durable and are therefore slower
    // 0 -> left, 1 -> right, 2+ -> nothing
    let random = GetRandomInt(2 + (this.GetFluidViscosity() / PixelViscosities.Water));
    
    if (random === 1) {
      const left = {x: this.Position.x - 1, y: this.Position.y};
      
      if (world.GetPixel(left) === null) {
        world.Swap({...this.Position}, left);
      }
    }
    else if (random === 2) {
      const right = {x: this.Position.x + 1, y: this.Position.y};
      if (world.GetPixel(right) === null) {
        world.Swap({...this.Position}, right);
      }
    }
  }
  
  IsStatic(): boolean {
    return false;
  }
  
  GetDurability(): number {
    return PixelDurabilities.Water;
  }
  
  GetFluidViscosity(): number {
    return PixelViscosities.Water; // Water is the least viscous
  }
  
  GetWeight(): number {
    return PixelWeights.Water;
  }
  
  GetType(): PixelType {
    return PixelType.Water;
  }
  
  GetColor(): string {
    return "blue";
  }
}