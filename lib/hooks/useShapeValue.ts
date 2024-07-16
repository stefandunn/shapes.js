import { useCallback, useEffect, useState } from 'react';
import { Shape } from '../shapes/shape';

/**
 * Returns the current value of the shape.
 */
export const useShapeValue = <T = unknown>(shape: Shape<T>) => {
  const [value, setValue] = useState(shape.value);

  const updateHandler = useCallback((newValue: T) => {
    setValue(newValue);
  }, []);

  useEffect(() => {
    shape.subscribeToUpdate(updateHandler);
  }, [shape, updateHandler]);

  return value;
};
