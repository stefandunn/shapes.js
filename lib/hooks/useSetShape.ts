import { useCallback } from 'react';
import { Shape } from '../shapes/shape';

export type SetStateFunc<T = unknown> = (prevValue: T) => T;
export type SetStateValue<T = unknown> = SetStateFunc<T> | T;

/**
 * Returns a "setState" like function which updates the shape's value
 */
export const useSetShape = <T = unknown>(shape: Shape<T>) =>
  useCallback(
    (value: SetStateValue<typeof shape.value>) => {
      const curValue = shape.getValue();
      let newValue = value;
      if (typeof value === 'function') {
        newValue = (value as SetStateFunc)(curValue) as typeof shape.value;
      }
      shape.setValue(newValue as typeof shape.value);
    },
    [shape],
  );
