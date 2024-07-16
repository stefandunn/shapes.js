import { Shape } from '../';
import { type SetStateValue, useSetShape } from './useSetShape';
import { useShapeValue } from './useShapeValue';

/**
 * Returns an array containing the current value of the shape and a "setState" like function
 * to update the shape's value.
 */
export const useShape = <T = unknown>(
  shape: Shape<T>,
): [typeof shape.value, (value: SetStateValue<T>) => void] => {
  const value = useShapeValue(shape);
  const setValue = useSetShape(shape);

  return [value, setValue];
};
