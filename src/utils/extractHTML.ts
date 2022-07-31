import cheerio from 'cheerio';
import { IPhrases } from '../typescript';

async function extractHTML(htmlContent: string) {
  try {
    const phrases: IPhrases[] = [];
    const $ = cheerio.load(htmlContent);
    $('.thought-card').each(function (i, e) {
      void i;
      void e;
      phrases.push({
        author: $(this).find('a').first().text(),
        text: $(this).find('p').first().text().replace(/\n/g, ''),
      });
    });

    let next = false;
    $('#paginacao').each(function (i, e) {
      void i;
      void e;
      if ($(this).find('.nav').last().text().includes('xima')) {
        next = true;
      }
    });

    return Promise.resolve({ phrases, next });
  } catch (err) {
    return Promise.reject(err);
  }
}
export default extractHTML;
