import { isSuccessfulRequest } from '../isSuccessfulRequest';

describe('isSuccessfulRequest', () => {
  it('should return true for status 200', () => {
    expect(isSuccessfulRequest(200)).toBe(true);
  });

  it('should return true for status 250', () => {
    expect(isSuccessfulRequest(250)).toBe(true);
  });

  it('should return true for status 399', () => {
    expect(isSuccessfulRequest(399)).toBe(true);
  });

  it('should return false for status 199', () => {
    expect(isSuccessfulRequest(199)).toBe(false);
  });

  it('should return false for status 400', () => {
    expect(isSuccessfulRequest(400)).toBe(false);
  });

  it('should return false for negative status', () => {
    expect(isSuccessfulRequest(-1)).toBe(false);
  });
});
