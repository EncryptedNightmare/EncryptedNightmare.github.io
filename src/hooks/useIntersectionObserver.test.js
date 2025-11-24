import { renderHook } from '@testing-library/react-hooks';
import useIntersectionObserver from './useIntersectionObserver';

// Mock IntersectionObserver
class IntersectionObserverMock {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.observe = jest.fn();
    this.unobserve = jest.fn();
    this.disconnect = jest.fn();
  }

  trigger(entries) {
    this.callback(entries, this);
  }
}

describe('useIntersectionObserver', () => {
  beforeAll(() => {
    global.IntersectionObserver = IntersectionObserverMock;
  });

  it('should observe an element', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useIntersectionObserver(callback));

    const element = document.createElement('div');
    result.current.observe(element);

    expect(result.current.observer.current.observe).toHaveBeenCalledWith(element);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should call callback when element intersects', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useIntersectionObserver(callback));

    const element = document.createElement('div');
    result.current.observe(element);

    // Simulate intersection
    const observer = result.current.observer.current;
    observer.trigger([{ isIntersecting: true, target: element }]);

    expect(callback).toHaveBeenCalledWith([{ isIntersecting: true, target: element }], observer);
  });
});