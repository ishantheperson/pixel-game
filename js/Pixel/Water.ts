///<reference path="../Pixel.ts"/>

class WaterPixel extends Pixel {
  Update(world: World): void {
    this.DidUpdate = true;
  
    const below = { x: this.Position.x, y: this.Position.y + 1 };
  
    // the reason this doesnt work is because two swaps happen
    // in the event that we have the diagonal configuration:
    // first the
    if (world.GetPixel(below) === null) {
      world.Swap({ ...this.Position }, below);
    }
    
    else {
      // 0 -> left, 1 -> right, 2 -> nothing
      let random = GetRandomInt(3);
      
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