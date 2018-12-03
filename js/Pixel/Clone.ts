/// <reference path="Block.ts" />

/**
 * Affects rate of cloning. 
 * Higher values lead to lower rates
 */
const CLONE_CHANCE = 8; 

/**
 * Clones the first thing which touches it.
 * Contigious with any neighboring ClonePixels
 */
class ClonePixel extends BlockPixel {
  private cloneType: PixelType = PixelType.Empty;

  public Update(world: World): void {
    if (this.cloneType === PixelType.Empty) {
      // Scan neighbours and try to pick up a pixel type
      for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
          const pixel = world.GetPixel({ x: this.GetPosition().x + x, y: this.GetPosition().y + y });

          if (pixel !== null) {
            if (pixel.GetType() === PixelType.Clone) {
              // See if we can get a PixelType from a neighboring ClonePixel
              const type = (pixel as ClonePixel).cloneType;
              if (type !== PixelType.Empty) this.cloneType = type;
            }
            else this.cloneType = pixel.GetType();
          }
        }
      }
    }
    else {
      // 50% chance of spawning a new pixel
      if (GetRandomInt(100) % CLONE_CHANCE === 0) {
        // Select a random location to the side
        const x = this.GetPosition().x + (GetRandomInt(3) - 1);
        const y = this.GetPosition().y + (GetRandomInt(3) - 1);
        world.AddPixel({ x, y }, this.cloneType);
      }
    }
  }

  public GetType(): PixelType {
    return PixelType.Clone;
  }

  public GetColor(): string {
    return PixelColors.Clone;
  }
}
