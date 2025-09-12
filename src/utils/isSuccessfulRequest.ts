/**
 * Check if the HTTP status code indicates a successful request (2xx or 3xx)
 * @param status - HTTP status code
 * @returns - True if the status code is between 200 and 399, false otherwise
 */
export function isSuccessfulRequest(status: number) {
  return status >= 200 && status <= 399;
}
