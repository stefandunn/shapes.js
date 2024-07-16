/* eslint-disable @typescript-eslint/no-explicit-any */
import { INVALID_SERIALISABLE_KEY, Shape, ShapeMorph, get } from './index';

let shapeMorphFamilyKey = 0;

export type DeriveFamilyFunc<T = unknown, P = unknown> = (param: P) => (getFunc: typeof get) => T;
export type DeriveFamilyDependency<P = unknown> = (param: P) => Shape<any>;

export class ShapeMorphFamily<T = unknown, P = string> {
  key: string;
  deriveFunc: DeriveFamilyFunc<T, P>;
  dependencies: (DeriveFamilyDependency<P> | Shape<any>)[];
  shapeDependencies: Shape[] = [];
  members: Record<string, Shape<T>> = {};

  constructor(
    key: string,
    deriveFunc: DeriveFamilyFunc<T, P>,
    dependencies?: (DeriveFamilyDependency<P> | Shape<any>)[],
  ) {
    this.key = key;
    this.deriveFunc = deriveFunc;
    this.dependencies = dependencies ?? [];
  }

  makeFamilyKey = (param: P) => {
    try {
      if (typeof param === 'function' || typeof param === 'undefined') {
        throw new Error(INVALID_SERIALISABLE_KEY);
      }
      const serialisedParam = JSON.stringify(param);
      return `${this.key}-${serialisedParam}`;
    } catch {
      throw new Error(INVALID_SERIALISABLE_KEY);
    }
  };

  createFamilyMember = (param: P) => {
    const key = this.makeFamilyKey(param);
    const shape = new ShapeMorph(
      key,
      this.deriveFunc(param),
      this.dependencies.map((dependency) =>
        typeof dependency === 'function'
          ? (dependency as DeriveFamilyDependency<P>)(param)
          : (dependency as Shape<any>),
      ),
    ).makeShape();
    this.members[key] = shape;
    return shape;
  };

  getOrCreateFamilyMember = (param: P) => {
    const key = this.makeFamilyKey(param);
    if (Object.prototype.hasOwnProperty.call(this.members, key)) {
      return this.members[key] as Shape<T>;
    }
    return this.createFamilyMember(param);
  };
}
/**
 * Creates a family of shapes all with an initial value. The family member's shape is accessible
 * using a serialisable key.
 */
export const shapeMorphFamily = <T = unknown, P = string>(
  deriveFunc: DeriveFamilyFunc<T, P>,
  dependencies?: (DeriveFamilyDependency<P> | Shape<any>)[],
) =>
  new ShapeMorphFamily<T, P>(
    `shape-morph-family-${shapeMorphFamilyKey++}`,
    deriveFunc,
    dependencies,
  ).getOrCreateFamilyMember;
