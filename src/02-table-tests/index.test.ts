// Uncomment the code below and write your tests
import { Action, simpleCalculator } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  // continue cases for other actions
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 3, b: 3, action: Action.Subtract, expected: 0 },
  { a: 9, b: 6, action: Action.Subtract, expected: 3 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 8, b: 2, action: Action.Multiply, expected: 16 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 12, b: 4, action: Action.Divide, expected: 3 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 12, b: 2, action: Action.Exponentiate, expected: 144 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  // Invalid cases
  { a: 12, b: 2, action: 'divide', expected: null },
  { a: 12, b: 2, action: 'multiply', expected: null },
  { a: 110, b: 2, action: 'add', expected: null },
  { a: '112', b: '2', action: Action.Add, expected: null },
  { a: '113', b: '20', action: Action.Multiply, expected: null },
  { a: '114', b: '28', action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test.each(testCases)(
    'given a: $a, b: $b, action: $action, returns $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
  // Consider to use Jest table tests API to test all cases above
});
