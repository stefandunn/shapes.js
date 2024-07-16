import { expect, it, describe } from 'vitest';
import { shapeFamily } from '../shapeFamily';
import { INVALID_SERIALISABLE_KEY } from '../utils';

describe('shapeFamily', () => {
  it('creates a shapeFamily with an initial value', () => {
    const testShapeFamily = shapeFamily(0);
    expect(testShapeFamily('first').initValue).toBe(0);
  });

  it('sets a shapeFamily value independently', () => {
    const testShapeFamily = shapeFamily(0);
    const firstFamilyMember = testShapeFamily('first');
    const secondFamilyMember = testShapeFamily('second');
    firstFamilyMember.setValue(10);
    expect(firstFamilyMember.getValue()).toBe(10);
    expect(secondFamilyMember.getValue()).toBe(0);
  });

  it('returns instance of existing shape when accessing family member with same key', () => {
    const testShapeFamily = shapeFamily(0);

    const firstShapeFamilyMember = testShapeFamily('first');
    const secondShapeFamilyMember = testShapeFamily('second');

    firstShapeFamilyMember.setValue(10);

    expect(testShapeFamily('first')).toEqual(firstShapeFamilyMember);
    expect(testShapeFamily('first')).not.toEqual(secondShapeFamilyMember);
  });

  it('throws an error if the family param key is not serialisable (as function)', () => {
    const testShapeFamily = shapeFamily<number, () => void>(0);
    try {
      testShapeFamily(() => {});
    } catch (e) {
      expect((e as Error).message).toBe(INVALID_SERIALISABLE_KEY);
    }
  });

  it('throws an error if the family param key is not serialisable (as undefined)', () => {
    const testShapeFamily = shapeFamily<number, undefined>(0);
    try {
      testShapeFamily(undefined);
    } catch (e) {
      expect((e as Error).message).toBe(INVALID_SERIALISABLE_KEY);
    }
  });
});
