import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList([1, 2, 3]);
    const expected = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };
    expect(linkedList).toStrictEqual(expected);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    // Write your test here
    const linkedList = generateLinkedList([4, 5, 6]);
    expect(linkedList).toMatchSnapshot();
  });

  // Check match by expect(...).toStrictEqual(...) for empty array
  test('should generate linked list from empty array', () => {
    const linkedList = generateLinkedList([]);
    const expected = { value: null, next: null };
    expect(linkedList).toStrictEqual(expected);
  });

  // Check match by expect(...).toStrictEqual(...) for single value
  test('should generate linked list from single value', () => {
    const linkedList = generateLinkedList([42]);
    const expected = {
      value: 42,
      next: {
        value: null,
        next: null,
      },
    };
    expect(linkedList).toStrictEqual(expected);
  });
});
