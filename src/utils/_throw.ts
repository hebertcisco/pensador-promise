export default function _throw(message: string | string[] | Error) {
  if (Array.isArray(message)) {
    throw new Error(message.join('\n'));
  }
  if (message instanceof Error) {
    throw message.message;
  }
  throw message;
}
