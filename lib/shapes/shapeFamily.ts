import { INVALID_SERIALISABLE_KEY, Shape } from './index';

let shapeFamilyKey = 0;

export class ShapeFamily<T = unknown, P = string> {
  key: string;
  value: T;
  members: Record<string, Shape<T>> = {};
  storage?: Storage;

  constructor(key: string, initValue: T, storage?: Storage) {
    this.key = key;
    this.value = initValue;
    this.storage = storage;
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
    const shape = new Shape(key, this.value, false, this.storage);
    this.members[key] = shape;
    return shape;
  };

  getOrCreateFamilyMember = (param: P): Shape<T> => {
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
export const shapeFamily = <T = unknown, P = string>(initValue: T, storage?: Storage) =>
  new ShapeFamily<typeof initValue, P>(`shape-family-${shapeFamilyKey++}`, initValue, storage)
    .getOrCreateFamilyMember;
