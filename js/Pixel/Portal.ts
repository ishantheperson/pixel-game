/// <reference path="Block.ts" />

const TELEPORT_COOLDOWN = 300;

class PortalPixel extends BlockPixel {
  /**
   * List of one pixel in each portal.
   */
  public static Portals: Vector2[] = [];

  public PortalNumber: number;

  public Update(world: World): void {
    super.Update(world);

    // Check neighbors
    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        const pixel = world.GetPixelNull({ x: this.GetPosition().x + x, y: this.GetPosition().y + y });

        if (pixel !== null && pixel.GetType() !== PixelType.Portal 
              && !pixel.IsStatic() && pixel.TeleportCooldown === 0) {
          // Get other portal
          const otherPortalIndex = this.PortalNumber + ((this.PortalNumber % 2 === 0) ? 1 : -1);

          if (otherPortalIndex < PortalPixel.Portals.length) {
            // Find an available space
            const otherPortal = PortalPixel.Portals[otherPortalIndex];
            Pixel.FloodFillSearch(otherPortal, world, (pos) => {
              // check neighbors
              const directions: Vector2[] = [
                { x: pos.x, y: pos.y + 1 },
                { x: pos.x - 1, y: pos.y },
                { x: pos.x + 1, y: pos.y },
                { x: pos.x, y: pos.y - 1 }
              ];

              for (const direction of directions) {
                if (world.GetPixelNull(direction) === null) {
                  // insert here
                  pixel.TeleportCooldown = TELEPORT_COOLDOWN;
                  world.Swap(pixel.GetPosition(), direction);
                  return true;
                }
              }
              return false;
            });
          }
        }
      }
    }
  }

  public GetColor(): string {
    return PixelColors.Portal;
  }

  public GetType(): PixelType {
    return PixelType.Portal;
  }
}

World.OnAddPixelHooks.push((location: Vector2, world: World) => {
  // Recalculate portals
  const pixel: Pixel = world.GetPixel(location);
  if (pixel instanceof PortalPixel) {
    // See if it's part of any existing portal
    let index = -1;
    Pixel.FloodFillSearch(location, world, (searchLocation: Vector2) => {
      const search = PortalPixel.Portals.findIndex((vec) => vec.x === searchLocation.x && vec.y === searchLocation.y);
      if (search !== -1) {
        index = search;
        return true;
      }

      return false;
    });

    if (index === -1) 
      (pixel as PortalPixel).PortalNumber = PortalPixel.Portals.push(location) - 1;
    else 
      (pixel as PortalPixel).PortalNumber = index;
  }
});
