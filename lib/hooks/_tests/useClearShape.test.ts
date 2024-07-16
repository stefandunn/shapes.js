import { expect, it, describe } from 'vitest';
import { useClearShape } from '../useClearShape';
import { shape } from '../../shapes';
import { renderHook } from '@testing-library/react';

describe('useClearShape', () => {
  it("returns a function to reset shape state to it's initial value", () => {
    const testShape = shape(0);
    testShape.setValue(10);
    const {
      result: { current: clearShape },
    } = renderHook(() => useClearShape(testShape));
    expect(testShape.getValue()).toBe(10);
    clearShape();
    expect(testShape.getValue()).toBe(testShape.initValue);
  });
});
