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
});
