import { expect, it, describe } from 'vitest';
import { shape } from '../shape';
import { get, set } from '../utils';

describe('utils', () => {
  describe('get', () => {
    it('get returns current value of shape', () => {
      const testShape = shape(0);
      expect(get(testShape)).toBe(0);
    });
  });

  describe('set', () => {
    it('set changes value of shape', () => {
      const testShape = shape(0);
      set(testShape, 10);
      expect(testShape.getValue()).toBe(10);
    });
  });
});
