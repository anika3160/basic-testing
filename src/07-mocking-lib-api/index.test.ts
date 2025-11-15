// Uncomment the code below and write your tests
jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: (fn: unknown) => fn,
}));

import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  let mockGet: jest.Mock;
  let mockCreate: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    mockGet = jest.fn();
    mockCreate = jest.fn(() => ({ get: mockGet }));
    (axios.create as jest.Mock) = mockCreate;
  });

  test('should create instance with provided base url', async () => {
    // Write your test here
    mockGet.mockResolvedValue({ data: {} });
    throttledGetDataFromApi('/users/1');
    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
    mockGet.mockResolvedValue({ data: {} });
    throttledGetDataFromApi('/users');
    jest.runAllTimers();
    await Promise.resolve();
    expect(mockGet).toHaveBeenCalledWith('/users');
  });

  test('should return response data', async () => {
    // Write your test here
    mockGet.mockResolvedValue({
      data: { user: 'Anna', username: 'anna316', id: 3 },
    });
    const promise = throttledGetDataFromApi('/users/3');
    jest.runAllTimers();
    await Promise.resolve();
    const result = await promise;
    expect(result).toEqual({ user: 'Anna', username: 'anna316', id: 3 });
  });
});
