class MagmaPixel extends WaterPixel {
  Update(world: World): void {
    super.Update(world);
  }
  
  GetFluidViscosity(): number {
    return 3;
  }
  
  GetColor(): string {
    return "red";
  }
}