// Uncomment the code below and write your tests
jest.mock('lodash', () => ({
  random: jest.fn(),
}));

import { random } from 'lodash';
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

const mockedRandom = jest.mocked(random);

describe('BankAccount', () => {
  afterEach(() => {
    mockedRandom.mockReset();
  });

  test('should create account with initial balance', () => {
    // Write your test here
    const account = getBankAccount(10);
    expect(account.getBalance()).toBe(10);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    const account = getBankAccount(10);
    expect(() => account.withdraw(20)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    const account = getBankAccount(10);
    const secondAccount = getBankAccount(10);
    expect(() => account.transfer(20, secondAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    const account = getBankAccount(10);
    expect(() => account.transfer(20, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    // Write your test here
    const account = getBankAccount(10);
    account.deposit(20);
    expect(account.getBalance()).toBe(30);
  });

  test('should withdraw money', () => {
    // Write your test here
    const account = getBankAccount(30);
    account.withdraw(10);
    expect(account.getBalance()).toBe(20);
  });

  test('should transfer money', () => {
    // Write your test here
    const account = getBankAccount(30);
    const secondAccount = getBankAccount(10);
    account.transfer(10, secondAccount);
    expect(account.getBalance()).toBe(20);
    expect(secondAccount.getBalance()).toBe(20);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    const account = getBankAccount(30);
    mockedRandom.mockReturnValueOnce(38).mockReturnValueOnce(1);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
    expect(balance).not.toBeNull();
    expect(balance).toBe(38);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    const account = getBankAccount(30);
    mockedRandom.mockReturnValueOnce(88).mockReturnValueOnce(1);
    await account.synchronizeBalance();
    expect(typeof account.getBalance()).toBe('number');
    expect(account.getBalance()).not.toBeNull();
    expect(account.getBalance()).toBe(88);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    const account = getBankAccount(30);
    mockedRandom.mockReturnValueOnce(13).mockReturnValueOnce(0);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
