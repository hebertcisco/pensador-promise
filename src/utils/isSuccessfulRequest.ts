export function isSuccessfulRequest(status: number) {
  return status >= 200 && status <= 399;
}
