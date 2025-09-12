import extractAuthors, { IAuthorLink } from '../extractAuthors';

describe('extractAuthors', () => {
  it('should extract author links from valid HTML', async () => {
    const html = `
      <html>
        <body>
          <a href="/autor/author1">Author One</a>
          <a href="/autor/author2">Author Two</a>
          <a href="/frases_de_author3">Author Three</a>
        </body>
      </html>
    `;
    const result = await extractAuthors(html);
    expect(result).toEqual([
      { name: 'Author One', href: '/autor/author1' },
      { name: 'Author Two', href: '/autor/author2' },
      { name: 'Author Three', href: '/frases_de_author3' },
    ]);
  });

  it('should ignore links that are not author links', async () => {
    const html = `
      <a href="/not_author">Not Author</a>
      <a href="/autor/author1">Author One</a>
    `;
    const result = await extractAuthors(html);
    expect(result).toEqual([{ name: 'Author One', href: '/autor/author1' }]);
  });

  it('should remove duplicate author links by href', async () => {
    const html = `
      <a href="/autor/author1">Author One</a>
      <a href="/autor/author1">Author One Duplicate</a>
    `;
    const result = await extractAuthors(html);
    expect(result).toEqual([{ name: 'Author One', href: '/autor/author1' }]);
  });

  it('should return an empty array if no author links are found', async () => {
    const html = `<a href="/not_author">Not Author</a>`;
    const result = await extractAuthors(html);
    expect(result).toEqual([]);
  });

  it('should reject if invalid HTML is provided', async () => {
    await expect(extractAuthors(undefined as any)).rejects.toBeDefined();
  });
});
