import { expect, it, describe, vi } from 'vitest';
import { shape } from '../shape';

describe('shape', () => {
  it('creates a shape with an initial value', () => {
    const testShape = shape(0);
    expect(testShape.initValue).toBe(0);
  });

  it('sets a shape value', () => {
    const testShape = shape(0);
    testShape.setValue(10);
    expect(testShape.value).toBe(10);
  });

  it('returns a derivable shape value straight from argument', () => {
    const testShape = shape(0);
    testShape.isDerived = true;
    expect(testShape.getInitialValue(10)).toBe(10);
  });

  it('returns a derivable shape value from storage', () => {
    const testShape = shape(0, localStorage);
    localStorage.setItem(testShape.storageKey, '10');
    testShape.isDerived = true;
    expect(testShape.getInitialValue()).toBe(10);
  });

  it('gets a shape initial value', () => {
    const testShape = shape(0);
    testShape.setValue(10);
    expect(testShape.initValue).toBe(0);
  });

  it('gets a shape value', () => {
    const testShape = shape(0);
    testShape.setValue(10);
    expect(testShape.getValue()).toBe(10);
  });

  it('stores value into Storage', () => {
    const testShape = shape('Hello world!', localStorage);
    testShape.setValue('Goodbye World!');
    expect(localStorage.getItem(testShape.storageKey)).toBe(JSON.stringify('Goodbye World!'));
  });

  it('subscribe callback gets invoked on value update', () => {
    const subscriberCb = vi.fn();
    const testShape = shape(0);
    testShape.subscribeToUpdate(subscriberCb);
    testShape.setValue(10);
    expect(subscriberCb).toBeCalledWith(10);
    testShape.setValue(20);
    expect(subscriberCb).toBeCalledWith(20);
  });

  it('multiple subscribe callbacks get invoked on value update', () => {
    const subscriberCb = vi.fn();
    const subscriberCb2 = vi.fn();
    const testShape = shape(0);
    testShape.subscribeToUpdate(subscriberCb);
    testShape.subscribeToUpdate(subscriberCb2);
    testShape.setValue(10);
    expect(subscriberCb).toBeCalledWith(10);
    expect(subscriberCb2).toBeCalledWith(10);
  });

  it('subscribed callback gets unsubscribed', () => {
    const subscriberCb = vi.fn();
    const testShape = shape(0);
    testShape.subscribeToUpdate(subscriberCb);
    testShape.setValue(10);
    expect(subscriberCb).toBeCalledWith(10);
    subscriberCb.mockClear();
    testShape.unsubscribeToUpdate(subscriberCb);
    expect(subscriberCb).not.toBeCalled();
  });
});
