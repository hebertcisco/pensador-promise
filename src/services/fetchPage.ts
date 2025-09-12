import iconv from 'iconv-lite';
import { request } from 'undici';
import qs from 'qs';
import { isSuccessfulRequest } from '../utils/isSuccessfulRequest';

/**
 * Fetches a page with the given search term and current page number from the specified base URL.
 * @param searchTerm
 * @param current
 * @param baseUrl
 * @returns
 */
export async function fetchPage(searchTerm: string, current = 1, baseUrl: string) {
  const params = qs.stringify({
    q: searchTerm,
    p: current,
  });
  try {
    const res = await request(`${baseUrl}/busca.php?${params}`);
    if (!isSuccessfulRequest(res.statusCode)) {
      throw new Error(`Error fetching ${searchTerm}, status code: ${res.statusCode}`);
    }
    const arrayBuffer = await res.body.arrayBuffer();
    const body = iconv.decode(Buffer.from(arrayBuffer), 'utf-8').toString();
    return body;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Error fetching ${searchTerm}`);
  }
}

export default fetchPage;
