import { expect, it, describe } from 'vitest';
import { shapeMorphFamily } from '../shapeMorphFamily';
import { shape } from '../shape';
import { INVALID_SERIALISABLE_KEY } from '../utils';
import { shapeFamily } from '../shapeFamily';

describe('shapeMorphFamily', () => {
  it('creates a shapeMorphFamily with a derived initial value', () => {
    const testSelectedPersonShape = shape('Fred');
    const testPersonIsSelectedMorph = shapeMorphFamily(
      (name) => (get) =>
        `${name} is ${get(testSelectedPersonShape) === name ? 'selected' : 'not selected'}`,
      [testSelectedPersonShape],
    );
    expect(testPersonIsSelectedMorph('Fred')?.getValue()).toBe('Fred is selected');
    expect(testPersonIsSelectedMorph('Jane')?.getValue()).toBe('Jane is not selected');
  });

  it('creates a shapeMorphFamily with a derived initial value from family dependency', () => {
    const testPersonIsSelectedShape = shapeFamily(false);
    const testFredIsSelectedShape = testPersonIsSelectedShape('Fred');
    const testPersonIsSelectedMorph = shapeMorphFamily(
      (name) => (get) =>
        `${name} is ${get(testPersonIsSelectedShape(name)) ? 'selected' : 'not selected'}`,
      [testPersonIsSelectedShape],
    );
    testFredIsSelectedShape.setValue(true);
    expect(testPersonIsSelectedMorph('Fred')?.getValue()).toBe('Fred is selected');
    expect(testPersonIsSelectedMorph('Jane')?.getValue()).toBe('Jane is not selected');
  });

  it('returns instance of existing shape when accessing family member with same key', () => {
    const testShapeMorphFamily = shapeMorphFamily<number, string>(() => () => 0);

    const firstShapeMorphFamilyMember = testShapeMorphFamily('first');
    const secondShapeMorphFamilyMember = testShapeMorphFamily('second');

    firstShapeMorphFamilyMember.setValue(10);

    expect(testShapeMorphFamily('first')).toEqual(firstShapeMorphFamilyMember);
    expect(testShapeMorphFamily('first')).not.toEqual(secondShapeMorphFamilyMember);
  });

  it('throws an error if the family param key is not serialisable (as undefined)', () => {
    const testSelectedPersonShape = shape('Fred');
    const testPersonIsSelectedMorph = shapeMorphFamily<string, undefined>(
      (name) => (get) =>
        `${name} is ${get(testSelectedPersonShape) === name ? 'selected' : 'not selected'}`,
      [testSelectedPersonShape],
    );
    try {
      testPersonIsSelectedMorph(undefined);
    } catch (e) {
      expect((e as Error).message).toBe(INVALID_SERIALISABLE_KEY);
    }
  });
});
