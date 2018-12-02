///<reference path="../Pixel.ts"/>

class WaterPixel extends Pixel {
  Update(world: World): void {
    this.DidUpdate = true;
  
    const below = { x: this.position.x, y: this.position.y + 1 };
  
    // the reason this doesnt work is because two swaps happen
    // in the event that we have the diagonal configuration:
    // first the
    if (world.GetPixel(below) === PixelType.Empty) {
      world.Swap({ ...this.position }, below);
      this.position.y++;
    }
    
    else {
      // 0 -> left, 1 -> right, 2 -> nothing
      let random = GetRandomInt(3);
      
      if (random === 1) {
        const left = {x: this.position.x - 1, y: this.position.y};
  
        if (world.GetPixel(left) === PixelType.Empty) {
          world.Swap({...this.position}, left);
          this.position.x--;
        }
      }
      else if (random === 2) {
        const right = {x: this.position.x + 1, y: this.position.y};
        if (world.GetPixel(right) === PixelType.Empty) {
          world.Swap({...this.position}, right);
          this.position.x++;
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