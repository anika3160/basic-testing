// Uncomment the code below and write your tests
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  existsSync: jest.fn(),
}));

jest.mock('path', () => ({
  ...jest.requireActual('path'),
  join: jest.fn(),
}));

import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';
import * as fs from 'fs';
import * as path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);
    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, interval);
    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, interval);

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(3);

    setIntervalSpy.mockRestore();
  });
});

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    // Write your test here
    (path.join as jest.Mock).mockReturnValue('/mocked/path');
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    const testPath = 'test.txt';

    await readFileAsynchronously(testPath);
    expect(path.join).toHaveBeenCalledWith(__dirname, testPath);
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously('not-exist.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    jest
      .spyOn(fs.promises, 'readFile')
      .mockResolvedValue(Buffer.from('file content'));

    const result = await readFileAsynchronously('exist.txt');
    expect(result).toBe('file content');
  });
});
