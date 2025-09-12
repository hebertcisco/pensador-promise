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

  it('deve retornar o corpo decodificado quando status for 200', async () => {
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

  it('deve retornar o corpo decodificado quando status for 302 (3xx)', async () => {
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

  it('deve lançar um erro com status quando status não for bem-sucedido', async () => {
    getRequestMock().mockResolvedValue({
      statusCode: 404,
      body: {
        arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(0)),
      },
    });

    await expect(fetchUrl(url)).rejects.toThrow(`Error fetching ${url}, status code: 404`);
  });

  it('deve relançar o mesmo Error quando a requisição falha com Error', async () => {
    const boom = new Error('boom');
    getRequestMock().mockImplementation(() => {
      throw boom;
    });

    await expect(fetchUrl(url)).rejects.toBe(boom);
  });

  it('deve lançar um novo Error quando a requisição falha com valor não-Error', async () => {
    getRequestMock().mockImplementation(() => {
      // Simula lançar um valor primitivo
      // eslint-disable-next-line no-throw-literal
      throw 'falha';
    });

    await expect(fetchUrl(url)).rejects.toThrow(`Error fetching ${url}`);
  });
});
