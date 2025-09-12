/**
 * Throws an error with the provided message.
 * @param message - The error message, which can be a string, an array of strings, or an Error object.
 * @throws Will throw an error with the provided message.
 */
export default function _throw(message: string | string[] | Error) {
  if (Array.isArray(message)) {
    throw new Error(message.join('\n'));
  }
  if (message instanceof Error) {
    throw message;
  }
  throw new Error(String(message));
}
