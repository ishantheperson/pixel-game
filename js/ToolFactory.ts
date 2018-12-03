/// <reference path="Tool.ts" />
/// <reference path="Tool/Explosion.ts" />
/// <reference path="Tool/Eraser.ts" />
/// <reference path="Tool/FloodEraser.ts" />

enum ToolType {
  Explosion,
  Eraser,
  FloodEraser
}

class ToolFactory {
  public static GetTool(type: ToolType): Tool {
    return this.toolsDict[ToolType[type]];
  }

  private static toolsDict = {
    Explosion: new ExplosionTool(),
    Eraser: new EraserTool(),
    FloodEraser: new FloodEraserTool()
  };
}
