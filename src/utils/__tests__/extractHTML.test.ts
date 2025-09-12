import extractHTML from '../extractHTML';
import { IPhrases } from '../../typescript';

describe('extractHTML', () => {
  it('should extract phrases and next=false from HTML with one phrase and no next page', async () => {
    const html = `
      <div class="thought-card">
        <a>Author One</a>
        <p>Phrase one text</p>
      </div>
      <div id="paginacao"></div>
    `;
    const result = await extractHTML(html);
    expect(result).toEqual({
      phrases: [{ author: 'Author One', text: 'Phrase one text' }],
      next: false,
    });
  });

  it('should extract multiple phrases and next=true if next page exists', async () => {
    const html = `
      <div class="thought-card">
        <a>Author One</a>
        <p>Phrase one text</p>
      </div>
      <div class="thought-card">
        <a>Author Two</a>
        <p>Phrase two text</p>
      </div>
      <div id="paginacao"><span class="nav">Próxima</span></div>
    `;
    const result = await extractHTML(html);
    expect(result).toEqual({
      phrases: [
        { author: 'Author One', text: 'Phrase one text' },
        { author: 'Author Two', text: 'Phrase two text' },
      ],
      next: true,
    });
  });

  it('should return empty phrases and next=false if no thought-card exists', async () => {
    const html = `<div id="paginacao"></div>`;
    const result = await extractHTML(html);
    expect(result).toEqual({ phrases: [], next: false });
  });

  it('should reject if invalid HTML is provided', async () => {
    await expect(extractHTML(undefined as any)).rejects.toBeDefined();
  });
});
