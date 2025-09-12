import cheerio from 'cheerio';

export interface IAuthorLink {
  name: string;
  href: string;
}

/**
 * Remove duplicate author links based on their href
 * @param items - Array of author links
 * @returns - Array of unique author links
 */
function uniqueByHref(items: IAuthorLink[]): IAuthorLink[] {
  const seen = new Set<string>();
  const out: IAuthorLink[] = [];
  for (const it of items) {
    if (!it.href) continue;
    if (seen.has(it.href)) continue;
    seen.add(it.href);
    out.push(it);
  }
  return out;
}

/**
 * Extract author links from the HTML content of the authors page
 * @param htmlContent - HTML content of the authors page
 * @returns - Promise resolving to an array of author links
 */
export default async function extractAuthors(htmlContent: string): Promise<IAuthorLink[]> {
  try {
    const $ = cheerio.load(htmlContent);
    const authors: IAuthorLink[] = [];

    $('a[href]').each(function () {
      const href = ($(this).attr('href') || '').trim();
      const name = $(this).text().trim();
      if (!href || !name) return;

      const isAuthorHref = /^\/autor\/[A-Za-z0-9_%-]+\/?$/.test(href) || /^\/frases_de_[A-Za-z0-9_%-]+\/?$/.test(href);
      if (isAuthorHref) {
        authors.push({ name, href });
      }
    });

    return Promise.resolve(uniqueByHref(authors));
  } catch (err) {
    return Promise.reject(err);
  }
}
