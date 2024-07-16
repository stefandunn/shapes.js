import { Shape, useSetShape } from '..';

/**
 * Restores the shape's current value back to it's initial value
 */
export const useClearShape = <T = unknown>(shape: Shape<T>) => {
  const clearValue = useSetShape(shape);

  return () => clearValue(shape.initValue);
};
