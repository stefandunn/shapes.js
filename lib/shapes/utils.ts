import { type Shape } from './index';

export const INVALID_SERIALISABLE_KEY = 'The defined param is not a serialisable value';

export const get = <T = unknown>(shape: Shape<T>) => shape.getValue();

export const set = <T = unknown>(shape: Shape<T>, value: T) => shape.setValue(value);
