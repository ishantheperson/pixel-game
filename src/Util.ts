/**
 * Represents a tuple
 */
type Vector2 = { x: number, y: number };

// tslint:disable-next-line:interface-name
interface Array<T> {
  find(predicate: (search: T) => boolean): T;
  includes(elem: T): boolean;
}

/**
 * Returns random integer in range [0, max)
 */
function GetRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Returns true `probability`% of the time
 * @param probability From 0-100%, chance this occurs
 */
function Chance(probability: number): boolean {
  return GetRandomInt(100) < probability;
}
