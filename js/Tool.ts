/**
 * Base tool (does nothing)
 */
abstract class Tool {
  /**
   * Applies this tool  
   * @param location Location to apply
   * @param world World object
   */
  public abstract Apply(location: Vector2, world: World): void;
}
