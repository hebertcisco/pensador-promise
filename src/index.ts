import { BASE_URL } from './constants';
import fetchPage from './services/fetchPage';
import { IOptions, IPhrases, IResult } from './typescript';
import extractHTML from './utils/extractHTML';
import _throw from './utils/_throw';
import slugify from 'slugify';

export default async (options: IOptions) => {
  if (options === undefined || options.term === undefined) {
    _throw('A search term must be defined');
  }

  const searchTerm = slugify(`frases de ${options.term}`, {
    replacement: '_',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });

  let keepGoing = true;
  let current = 1;

  let phrases: IPhrases[] = [];

  while (keepGoing) {
    let contentPage: string | any = await fetchPage(searchTerm, current, BASE_URL);
    console.log(contentPage);
    let result: IResult | any = await extractHTML(contentPage);

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
