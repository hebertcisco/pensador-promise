import { fetchPage } from '../fetchPage';

// Mock de 'undici' para controlar respostas e erros sem rede
jest.mock('undici', () => ({
  request: jest.fn(),
}));

const getRequestMock = () => require('undici').request as jest.Mock;

describe('fetchPage', () => {
  const baseUrl = 'https://example.com';
  const term = 'Elon Musk';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return decoded body when status is 200 and build URL with params', async () => {
    const bodyText = 'Página 1';
    const arrayBuffer = new TextEncoder().encode(bodyText).buffer;
    getRequestMock().mockResolvedValue({
      statusCode: 200,
      body: { arrayBuffer: jest.fn().mockResolvedValue(arrayBuffer) },
    });

    const result = await fetchPage(term, 1, baseUrl);
    expect(result).toBe(bodyText);

    const calledWith = getRequestMock().mock.calls[0][0] as string;
    const url = new URL(calledWith);
    expect(url.origin + url.pathname).toBe(`${baseUrl}/busca.php`);
    expect(url.searchParams.get('q')).toBe(term);
    expect(url.searchParams.get('p')).toBe('1');
  });

  it('should return decoded body when status is 302 (3xx)', async () => {
    const bodyText = 'Redirecionado';
    const arrayBuffer = new TextEncoder().encode(bodyText).buffer;
    getRequestMock().mockResolvedValue({
      statusCode: 302,
      body: { arrayBuffer: jest.fn().mockResolvedValue(arrayBuffer) },
    });

    const result = await fetchPage(term, 2, baseUrl);
    expect(result).toBe(bodyText);
  });

  it('should use current=1 by default when undefined is passed', async () => {
    const bodyText = 'Default page';
    const arrayBuffer = new TextEncoder().encode(bodyText).buffer;
    getRequestMock().mockResolvedValue({
      statusCode: 200,
      body: { arrayBuffer: jest.fn().mockResolvedValue(arrayBuffer) },
    });

    const result = await fetchPage(term, undefined as unknown as number, baseUrl);
    expect(result).toBe(bodyText);

    const calledWith = getRequestMock().mock.calls[0][0] as string;
    const url = new URL(calledWith);
    expect(url.searchParams.get('p')).toBe('1');
  });

  it('should throw an error with status when status is not successful', async () => {
    getRequestMock().mockResolvedValue({
      statusCode: 404,
      body: { arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(0)) },
    });

    await expect(fetchPage(term, 1, baseUrl)).rejects.toThrow(`Error fetching ${term}, status code: 404`);
  });

  it('should rethrow the same Error when the request fails with Error', async () => {
    const boom = new Error('boom');
    getRequestMock().mockImplementation(() => {
      throw boom;
    });

    await expect(fetchPage(term, 1, baseUrl)).rejects.toBe(boom);
  });

  it('should throw a new Error when the request fails with a non-Error value', async () => {
    getRequestMock().mockImplementation(() => {
      // eslint-disable-next-line no-throw-literal
      throw 'falha';
    });

    await expect(fetchPage(term, 1, baseUrl)).rejects.toThrow(`Error fetching ${term}`);
  });
});
