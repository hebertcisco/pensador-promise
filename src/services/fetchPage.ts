import iconv from 'iconv-lite';
import { request } from 'undici';

async function fetchPage(searchTerm: string, current = 1, baseUrl: string) {
  return new Promise((resolve, reject) => {
    return request(`${baseUrl}/${searchTerm}/${current}`)
      .then((res) => res.body.arrayBuffer())
      .then((arrayBuffer) => iconv.decode(Buffer.from(arrayBuffer), 'utf-8').toString())
      .then((body) => resolve(body))
      .catch((err) => reject(err));
  });
}
export default fetchPage;
