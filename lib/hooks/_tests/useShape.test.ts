import { expect, it, describe } from 'vitest';
import { useShape } from '../useShape';
import { shape } from '../../shapes';
import { renderHook } from '@testing-library/react';
import { act } from 'react';

describe('useShape', () => {
  it('returns a value and function to read and set shape value', () => {
    const testShape = shape(0);
    const { result } = renderHook(() => useShape(testShape));
    act(() => {
      result.current[1](10);
    });
    expect(result.current[0]).toBe(10);
  });
});
