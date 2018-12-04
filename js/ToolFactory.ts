/// <reference path="Tool.ts" />
/// <reference path="Tool/Explosion.ts" />
/// <reference path="Tool/Eraser.ts" />
/// <reference path="Tool/FloodEraser.ts" />
/// <reference path="Tool/Attract.ts" />

enum ToolType {
  Explosion,
  Eraser,
  FloodEraser,
  Attract
}

class ToolFactory {
  public static GetTool(type: ToolType): Tool {
    return this.toolsDict[ToolType[type]];
  }

  private static toolsDict = {
    Explosion: new ExplosionTool(),
    Eraser: new EraserTool(),
    FloodEraser: new FloodEraserTool(),
    Attract: new AttractTool()
  };
}
