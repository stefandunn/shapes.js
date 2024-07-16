import { expect, it, describe, vi } from 'vitest';
import { shapeMorph } from '../shapeMorph';
import { shape } from '../shape';

describe('shapeMorph', () => {
  it('creates a shapeMorph with a derived initial value', () => {
    const testShape = shape(10);
    const testMorph = shapeMorph((get) => get(testShape), [testShape]);
    expect(testMorph.initValue).toBe(10);
  });

  it('creates a shapeMorph with a derived initial value and no dependencies', () => {
    const testShape = shape(10);
    const testMorph = shapeMorph((get) => get(testShape));
    expect(testMorph.initValue).toBe(10);
  });

  it('creates a shapeMorph with a derived initial value', () => {
    const testShape = shape(10);
    const testMorph = shapeMorph((get) => get(testShape), [testShape]);
    expect(testMorph.initValue).toBe(10);
  });

  it("invokes a shapeMorph's subscribed callback function when dependency updates", () => {
    const testShape = shape(10);
    const testDoubleValueMorph = shapeMorph((get) => get(testShape) * 2, [testShape]);
    const subscriberCb = vi.fn();
    testDoubleValueMorph.subscribeToUpdate(subscriberCb);
    testShape.setValue(100);
    expect(subscriberCb).toBeCalledWith(200);
  });
});
