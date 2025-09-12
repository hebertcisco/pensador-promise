import { fetchUrl } from '../fetchUrl';

jest.mock('undici', () => ({
  request: jest.fn(),
}));

const getRequestMock = () => require('undici').request as jest.Mock;

describe('fetchUrl', () => {
  const url = 'https://example.com/teste';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return decoded body when status is 200', async () => {
    const bodyText = 'Olá mundo';
    const arrayBuffer = new TextEncoder().encode(bodyText).buffer;
    getRequestMock().mockResolvedValue({
      statusCode: 200,
      body: {
        arrayBuffer: jest.fn().mockResolvedValue(arrayBuffer),
      },
    });

    const result = await fetchUrl(url);
    expect(result).toBe(bodyText);
    expect(getRequestMock()).toHaveBeenCalledWith(url);
  });

  it('should return decoded body when status is 302 (3xx)', async () => {
    const bodyText = 'Redirecionado';
    const arrayBuffer = new TextEncoder().encode(bodyText).buffer;
    getRequestMock().mockResolvedValue({
      statusCode: 302,
      body: {
        arrayBuffer: jest.fn().mockResolvedValue(arrayBuffer),
      },
    });

    const result = await fetchUrl(url);
    expect(result).toBe(bodyText);
  });

  it('should throw an error with status when status is not successful', async () => {
    getRequestMock().mockResolvedValue({
      statusCode: 404,
      body: {
        arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(0)),
      },
    });

    await expect(fetchUrl(url)).rejects.toThrow(`Error fetching ${url}, status code: 404`);
  });

  it('should rethrow the same Error when the request fails with Error', async () => {
    const boom = new Error('boom');
    getRequestMock().mockImplementation(() => {
      throw boom;
    });

    await expect(fetchUrl(url)).rejects.toBe(boom);
  });

  it('should throw a new Error when the request fails with a non-Error value', async () => {
    getRequestMock().mockImplementation(() => {
      // Simula lançar um valor primitivo
      // eslint-disable-next-line no-throw-literal
      throw 'falha';
    });

    await expect(fetchUrl(url)).rejects.toThrow(`Error fetching ${url}`);
  });
});
