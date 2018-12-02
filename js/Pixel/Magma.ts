class MagmaPixel extends WaterPixel {
  Update(world: World): void {
    super.Update(world);
    
    // Destroy a neighbor
    let didDestroy = false;
    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        if (world.DestroyPixel({ x: this.Position.x + x, y: this.Position.y + y }, this.GetDurability()))
          didDestroy = true;
      }
    }
    if (didDestroy) world.DestroyPixel(this.Position, Number.MAX_SAFE_INTEGER);
  }
  
  GetDurability(): number {
    return PixelDurabilities.Magma;
  }
  
  GetFluidViscosity(): number {
    return 5;
  }
  
  GetColor(): string {
    return "red";
  }
  
  GetType(): PixelType {
    return PixelType.Magma;
  }
}