/**
 * Represents a tuple
 */
type Vector2 = { x: number, y: number };

// tslint:disable-next-line:interface-name
interface Array<T> {
  find(predicate: (search: T) => boolean): T;
}

/**
 * Returns random integer in range [0, max)
 */
function GetRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}
