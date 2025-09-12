import pensador from '../index';

describe('Pensador', () => {
  it('Works', async () => {
    const result = await pensador({ term: 'Elon Musk', max: 5 });
    expect(result.searchTerm).toBe('elon_musk');
  });
  it('Should return phrases', async () => {
    const result = await pensador({ term: 'Elon Musk', max: 5 });
    expect(result.total).toBeGreaterThan(0);
  });
  it('Should return a random phrase from a random author', async () => {
    const { randomPhrase } = await import('..');
    const phrase = await randomPhrase();
    expect(phrase).toHaveProperty('author');
    expect(phrase).toHaveProperty('text');
    expect(phrase.author.length).toBeGreaterThan(0);
    expect(phrase.text.length).toBeGreaterThan(0);
  });
});
