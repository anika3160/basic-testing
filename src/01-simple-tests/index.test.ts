// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    // Write your test here
    const input = { a: 2, b: 3, action: Action.Add };
    const result = simpleCalculator(input);
    expect(result).toBe(5);
  });

  test('should subtract two numbers', () => {
    // Write your test here
    const input = { a: 3, b: 2, action: Action.Subtract };
    const result = simpleCalculator(input);
    expect(result).toBe(1);
  });

  test('should multiply two numbers', () => {
    // Write your test here
    const input = { a: 3, b: 4, action: Action.Multiply };
    const result = simpleCalculator(input);
    expect(result).toBe(12);
  });

  test('should divide two numbers', () => {
    // Write your test here
    const input = { a: 12, b: 4, action: Action.Divide };
    const result = simpleCalculator(input);
    expect(result).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
    const input = { a: 12, b: 2, action: Action.Exponentiate };
    const result = simpleCalculator(input);
    expect(result).toBe(144);
  });

  test('should return null for invalid action', () => {
    // Write your test here
    const input = { a: 12, b: 2, action: 'divide' };
    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
    const input = { a: '12', b: 2, action: Action.Add };
    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });
});
