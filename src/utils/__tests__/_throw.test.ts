import _throw from '../_throw';

describe('_throw', () => {
  it('should throw an error with the provided string message', () => {
    const errorMessage = 'Test error message';
    expect(() => _throw(errorMessage)).toThrow(errorMessage);
  });

  it('should throw an error with the joined array message', () => {
    const errorMessages = ['Error 1', 'Error 2'];
    expect(() => _throw(errorMessages)).toThrow('Error 1\nError 2');
  });

  it('should throw the message from an Error object', () => {
    const error = new Error('Error object message');
    expect(() => _throw(error)).toThrow('Error object message');
  });
});
