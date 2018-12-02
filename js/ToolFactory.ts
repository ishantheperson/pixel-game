enum ToolType {
  Default,
  Explosion
}

class ToolFactory {
  static GetTool(type: ToolType) {
    switch (type) {
      case ToolType.Default:
        return Tool;
        
      case ToolType.Explosion:
        return ExplosionTool;
        
      default:
        throw new TypeError("Unknown ToolType " + type);
    }
  }
}