import { expect, it, describe } from 'vitest';
import { useSetShape } from '../useSetShape';
import { shape } from '../../shapes';
import { renderHook } from '@testing-library/react';

describe('useSetShape', () => {
  it('returns a function to set the shape value', () => {
    const testShape = shape(0);
    const {
      result: { current: setValue },
    } = renderHook(() => useSetShape(testShape));
    setValue(10);
    expect(testShape.getValue()).toBe(10);
  });

  it('returns a function to set the shape value using a dispatch', () => {
    const testShape = shape(0);
    const {
      result: { current: setValue },
    } = renderHook(() => useSetShape(testShape));
    setValue((oldVal) => oldVal + 1);
    expect(testShape.getValue()).toBe(1);
  });
});
