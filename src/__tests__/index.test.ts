import pensador from '../index';

it('Works', async () => {
  const result = await pensador({ term: 'Elon Musk', max: 5 });

  expect(result.searchTerm).toBe('frases_de_elon_musk');
});
