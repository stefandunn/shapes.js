let shapeKey = 0;

type UpdateHandler<T> = (value: T) => void;

export class Shape<T = unknown> {
  key: string;
  storageKey: string;
  initValue: T;
  value: T;
  updateHandlers: UpdateHandler<T>[] = [];
  storage?: Storage;
  isDerived: boolean = false;

  constructor(key: string, initValue: T, isDerived = false, storage?: Storage) {
    this.key = key;
    this.storageKey = `shape__${this.key}`;
    this.initValue = this.getInitialValue(initValue);
    this.value = this.getInitialValue(initValue);
    this.isDerived = isDerived;
    this.storage = storage;
  }

  getInitialValue = (initValue?: T) => {
    if (this.isDerived && initValue) {
      return initValue;
    }
    const storageVal = this.storage?.getItem(this.storageKey);
    return (storageVal ? JSON.parse(storageVal) : initValue) as T;
  };

  subscribeToUpdate = (handler: UpdateHandler<T>) => {
    this.updateHandlers.push(handler);
    handler(this.getValue());
  };

  unsubscribeToUpdate = (handler: UpdateHandler<T>) => {
    this.updateHandlers = this.updateHandlers.filter((updateHandler) => updateHandler !== handler);
  };

  setValue = (value: typeof this.value) => {
    if (!this.isDerived) {
      this.storage?.setItem(this.storageKey, JSON.stringify(value));
    }
    this.value = value;
    Promise.all(
      this.updateHandlers.map((handler) => new Promise((resolve) => resolve(handler(value)))),
    );
  };

  getValue = () => this.value;
}

/**
 * Creates a primitive shape with an initial value.
 */
export const shape = <T = unknown>(initValue: T, storage?: Storage): Shape<typeof initValue> =>
  new Shape<typeof initValue>(`shape-${shapeKey++}`, initValue, false, storage);
