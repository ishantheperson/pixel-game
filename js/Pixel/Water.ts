///<reference path="../Pixel.ts"/>

class WaterPixel extends Pixel {
  Update(world: World): void {
    const below = { x: this.position.x, y: this.position.y + 1 };
  
    if (world.GetPixel(below) == null) {
      world.Swap({ ...this.position }, below);
      this.position.y++;
    }
    
    else {
      // check bottom left and right
      const left = { x: this.position.x - 1, y: this.position.y + 1 };
      const right = { x: this.position.x + 1, y : this.position.y + 1 };
      
      if (world.GetPixel(left) == null) {
        world.Swap({ ...this.position }, left);
        this.position = left;
      }
      else if (world.GetPixel(right) == null) {
        world.Swap({ ...this.position }, right);
        this.position = right;
      }
    }
  }
  
  GetType(): PixelType {
    return PixelType.Water;
  }
  
  GetColor(): string {
    return "blue";
  }
}