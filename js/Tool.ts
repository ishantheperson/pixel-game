/**
 * Base tool (does nothing)
 */
abstract class Tool {
  public abstract Apply(location: Vector2, world: World): void;
}
