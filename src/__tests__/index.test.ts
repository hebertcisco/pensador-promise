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
  it('Should return an error when the term is not provided', async () => {
    try {
      await pensador({
        max: 5,
        term: '',
      });
    } catch (err: any) {
      expect(err.message).toBe('The term is required');
    }
  });
  it('Should return an error when the max is not provided', async () => {
    try {
      await pensador({
        max: 0,
        term: 'Elon Musk',
      });
    } catch (err: any) {
      expect(err.message).toBe('The max is required');
    }
  });
});
