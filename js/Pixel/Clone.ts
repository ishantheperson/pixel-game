/// <reference path="Block.ts" />

class ClonePixel extends BlockPixel {
  private cloneType: PixelType = PixelType.Empty;

  public Update(world: World): void {
    if (this.cloneType === PixelType.Empty) {
      // Scan neighbours and try to pick up a pixel type
      for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
          const pixel = world.GetPixel({ x: this.Position.x + x, y: this.Position.y + y });
          if (pixel !== null && pixel.GetType() !== PixelType.Clone) 
            this.cloneType = pixel.GetType();
        }
      }
    }
    else {
      // 50% chance of spawning a new pixel
      if (GetRandomInt(100) % 4 === 0) {
        // Select a random location to the side
        const x = this.Position.x + (GetRandomInt(3) - 1);
        const y = this.Position.y + (GetRandomInt(3) - 1);
        world.AddPixel({ x, y }, this.cloneType);
      }
    }
  }

  public GetType(): PixelType {
    return PixelType.Clone;
  }

  public GetColor(): string {
    return "beige";
  }
}
