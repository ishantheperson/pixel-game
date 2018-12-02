type Vector2 = { x: number, y: number };

interface Array<T> {
  find(predicate: (search: T) => boolean) : T;
}
