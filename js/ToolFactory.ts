/// <reference path="Tool.ts" />
/// <reference path="Tool/Explosion.ts" />
/// <reference path="Tool/Eraser.ts" />

enum ToolType {
  Explosion,
  Eraser
}

class ToolFactory {
  public static GetTool(type: ToolType): Tool {
    return this.toolsDict[ToolType[type]];
  }

  private static toolsDict = {
    Explosion: new ExplosionTool(),
    Eraser: new Eraser()
  };
}
