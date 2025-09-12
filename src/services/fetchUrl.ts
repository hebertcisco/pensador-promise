import iconv from 'iconv-lite';
import { request } from 'undici';
import { isSuccessfulRequest } from '../utils/isSuccessfulRequest';

/**
 * Fetches the content of the specified URL.
 * @param url
 * @returns
 */
export async function fetchUrl(url: string) {
  try {
    const res = await request(url);
    if (!isSuccessfulRequest(res.statusCode)) {
      throw new Error(`Error fetching ${url}, status code: ${res.statusCode}`);
    }
    const arrayBuffer = await res.body.arrayBuffer();
    const body = iconv.decode(Buffer.from(arrayBuffer), 'utf-8').toString();
    return body;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Error fetching ${url}`);
  }
}

export default fetchUrl;
