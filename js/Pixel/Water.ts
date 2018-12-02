///<reference path="../Pixel.ts"/>

class WaterPixel extends Pixel {
  Update(world: World): void {
    this.DidUpdate = true;
  
    const below = { x: this.Position.x, y: this.Position.y + 1 };
    const belowPixel = world.GetPixel(below);
    
    if (Pixel.CanMoveInto(this, belowPixel)) {
      world.Swap({ ...this.Position }, below);
    }
    
    else {
      // Affects liquid spread speed
      // Thicker liquids are more durable and are therefore slower
      // 0 -> left, 1 -> right, 2+ -> nothing
      let random = GetRandomInt(2 + (this.GetDurability() / PixelDurabilities.Water));
      
      if (random === 1) {
        const left = { x: this.Position.x - 1, y: this.Position.y };
  
        if (world.GetPixel(left) === null) {
          world.Swap({...this.Position}, left);
        }
      }
      else if (random === 2) {
        const right = { x: this.Position.x + 1, y: this.Position.y };
        if (world.GetPixel(right) === null) {
          world.Swap({...this.Position}, right);
        }
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
    return 1; // Water is the least viscous
  }
  
  GetType(): PixelType {
    return PixelType.Water;
  }
  
  GetColor(): string {
    return "blue";
  }
}