import { BASE_URL } from './constants';
import fetchPage from './services/fetchPage';
import fetchUrl from './services/fetchUrl';
import { IOptions, IPhrases, IResult } from './typescript';
import extractHTML from './utils/extractHTML';
import _throw from './utils/_throw';
import slugify from 'slugify';
import extractAuthors from './utils/extractAuthors';

/** Searches for phrases based on the provided options.
 * @param options - Search options including term and max number of phrases
 * @returns - An object containing the total number of phrases found, the search term, and an array of phrases
 */
export default async (options: IOptions) => {
  if (options === undefined || options.term === undefined) {
    _throw('A search term must be defined');
  }

  const searchTerm = slugify(`${options.term}`, {
    replacement: '_',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });

  let keepGoing = true;
  let current = 1;

  let phrases: IPhrases[] = [];

  while (keepGoing) {
    const contentPage: string | any = await fetchPage(searchTerm, current, BASE_URL);
    const result: IResult | any = await extractHTML(contentPage);

    phrases.push(...result.phrases);

    if (options.max !== undefined && phrases.length > options.max) {
      phrases = phrases.slice(0, options.max);

      keepGoing = false;
    }

    if (result.next === false) {
      keepGoing = false;
    }

    current = current + 1;
  }

  return { total: phrases.length, searchTerm, phrases };
};

/** Fetches a random phrase from a random author
 * @returns - A promise that resolves to a random phrase object
 */
export async function randomPhrase(): Promise<IPhrases> {
  const authorsPageUrl = `${BASE_URL}/autores/`;
  const authorsHtml = await fetchUrl(authorsPageUrl);
  const authors = await extractAuthors(authorsHtml);

  if (!authors || authors.length === 0) {
    _throw('Could not extract authors from autores page');
  }

  const randomAuthor = authors[Math.floor(Math.random() * authors.length)];

  const authorUrl = randomAuthor.href.startsWith('http') ? randomAuthor.href : `${BASE_URL}${randomAuthor.href}`;

  const authorHtml = await fetchUrl(authorUrl);
  const result: IResult | any = await extractHTML(authorHtml);

  if (!result || !result.phrases || result.phrases.length === 0) {
    _throw(`No phrases found for author: ${randomAuthor.name}`);
  }

  const phrase = result.phrases[Math.floor(Math.random() * result.phrases.length)];
  return phrase as IPhrases;
}
