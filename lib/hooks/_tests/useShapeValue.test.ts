import { expect, it, describe } from 'vitest';
import { useShapeValue } from '../useShapeValue';
import { shape } from '../../shapes';
import { renderHook } from '@testing-library/react';

describe('useShapeValue', () => {
  it('returns a value and function to read and set shape value', () => {
    const testShape = shape(10);
    const {
      result: { current: value },
    } = renderHook(() => useShapeValue(testShape));
    expect(value).toBe(10);
  });
});
