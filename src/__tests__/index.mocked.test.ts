import pensador, { randomPhrase } from '../index';

jest.mock('../services/fetchPage');
jest.mock('../services/fetchUrl');
jest.mock('../utils/extractHTML');
jest.mock('../utils/extractAuthors');

const fetchPage = require('../services/fetchPage').default;
const fetchUrl = require('../services/fetchUrl').default;
const extractHTML = require('../utils/extractHTML').default;
const extractAuthors = require('../utils/extractAuthors').default;

describe('Pensador (mocked)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw if options or term is missing', async () => {
        await expect(pensador(undefined as any)).rejects.toThrow('A search term must be defined');
        await expect(pensador({} as any)).rejects.toThrow('A search term must be defined');
    });

    it('should slice phrases if max is set and more are found', async () => {
        fetchPage.mockResolvedValue('dummy');
        extractHTML.mockResolvedValue({ phrases: Array(10).fill({ author: 'A', text: 'B' }), next: false });
        const result = await pensador({ term: 'test', max: 5 });
        expect(result.phrases.length).toBe(5);
        expect(result.total).toBe(5);
    });

    it('should stop when result.next is false', async () => {
        fetchPage.mockResolvedValue('dummy');
        extractHTML.mockResolvedValueOnce({ phrases: [{ author: 'A', text: 'B' }], next: false });
        const result = await pensador({ term: 'test', max: 10 });
        expect(result.phrases.length).toBe(1);
        expect(result.total).toBe(1);
    });

    it('randomPhrase should throw if no authors found', async () => {
        fetchUrl.mockResolvedValue('authorsHtml');
        extractAuthors.mockResolvedValue([]);
        await expect(randomPhrase()).rejects.toThrow('Could not extract authors from autores page');
    });

    it('randomPhrase should throw if no phrases found for author', async () => {
        fetchUrl.mockResolvedValueOnce('authorsHtml');
        extractAuthors.mockResolvedValue([{ name: 'A', href: '/autor/a' }]);
        fetchUrl.mockResolvedValueOnce('authorHtml');
        extractHTML.mockResolvedValue({ phrases: [], next: false });
        await expect(randomPhrase()).rejects.toThrow('No phrases found for author: A');
    });

    it('randomPhrase should return a phrase if found', async () => {
        fetchUrl.mockResolvedValueOnce('authorsHtml');
        extractAuthors.mockResolvedValue([{ name: 'A', href: '/autor/a' }]);
        fetchUrl.mockResolvedValueOnce('authorHtml');
        extractHTML.mockResolvedValue({ phrases: [{ author: 'A', text: 'B' }], next: false });
        const phrase = await randomPhrase();
        expect(phrase).toEqual({ author: 'A', text: 'B' });
    });
});
