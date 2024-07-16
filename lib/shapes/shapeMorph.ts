/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, Shape } from './index';

let shapeMorphKey = 0;
let shapeKey = 0;

export type DeriveFunc<T = unknown> = (getFunc: typeof get) => T;

export class ShapeMorph<T = unknown> {
  key: string;
  deriveFunc: DeriveFunc<T>;
  dependencies: Shape[];
  shape!: Shape<T>;

  constructor(key: string, deriveFunc: DeriveFunc<T>, dependencies: Shape<any>[]) {
    this.key = key;
    this.deriveFunc = deriveFunc;
    this.dependencies = dependencies;
  }

  recalculateDerivedValue = () => {
    this.shape.setValue(this.deriveFunc(get));
  };

  makeShape = () => {
    const key = `shape-morph-${shapeMorphKey++}-shape-${shapeKey++}`;
    this.shape = new Shape<T>(key, this.deriveFunc(get), true);

    // Subscribe to dependency updates
    this.dependencies.forEach((dependencyShape) => {
      dependencyShape.subscribeToUpdate(this.recalculateDerivedValue);
    });

    return this.shape;
  };
}

/**
 * Creates a primitive shape with an initial value.
 */
export const shapeMorph = <T = unknown>(
  deriveFunc: DeriveFunc<T>,
  dependencies?: Shape<any>[],
): Shape<ReturnType<typeof deriveFunc>> =>
  new ShapeMorph<T>(`shape-morph-${shapeMorphKey++}`, deriveFunc, dependencies ?? []).makeShape();
