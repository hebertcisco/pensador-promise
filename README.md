<p align="center">
  <img width="100px" src="https://raw.githubusercontent.com/hebertcisco/pensador-promise/main/.github/images/favicon512x512-pensador.png" align="center" alt=":package: pensador-promise" />
</p>
<h2 align="center">pensador-promise</h2>
<p align="center">Frases do Pensador via Web Scraping – simples e tipado</p>

<p align="center">
  <a href="https://www.npmjs.com/package/pensador-promise"><img alt="npm" src="https://img.shields.io/npm/v/pensador-promise.svg?color=336791"></a>
  <a href="https://github.com/hebertcisco/pensador-promise/actions/workflows/coverage.yml"><img alt="Coverage" src="https://github.com/hebertcisco/pensador-promise/actions/workflows/coverage.yml/badge.svg"></a>
  <a href="https://github.com/hebertcisco/pensador-promise/actions/workflows/npm-publish.yml"><img alt="Publish" src="https://github.com/hebertcisco/pensador-promise/actions/workflows/npm-publish.yml/badge.svg"></a>
  <a href="https://codecov.io/gh/hebertcisco/pensador-promise"><img alt="codecov" src="https://codecov.io/gh/hebertcisco/pensador-promise/branch/main/graph/badge.svg?token=ETOV4Z3YZQ"></a>
  <a href="LICENSE.md"><img alt="License" src="https://img.shields.io/badge/license-MIT-336791.svg"></a>
</p>

<p align="center">
  <a href="https://github.com/hebertcisco/pensador-promise/issues/new/choose">Reportar bug</a>
  ·
  <a href="https://github.com/hebertcisco/pensador-promise/issues/new/choose">Sugerir feature</a>
  ·
  <a href="https://www.buymeacoffee.com/hebertcisco">Apoiar o projeto</a>
</p>

## Requisitos

- Node.js 18, 19, 20, 21 ou 22

## Instalação

```sh
npm i pensador-promise
```

ou

```sh
yarn add pensador-promise
```

## Uso rápido

ESM/TypeScript

```ts
import pensador, { randomPhrase } from 'pensador-promise';

// Buscar frases por termo
const result = await pensador({ term: 'Jesus Cristo', max: 1 });
console.log(result);

// Uma frase aleatória de um autor aleatório
const phrase = await randomPhrase();
console.log(`${phrase.author}: ${phrase.text}`);
```

CommonJS

```js
const pensador = require('pensador-promise').default;
const { randomPhrase } = require('pensador-promise');

(async () => {
  const result = await pensador({ term: 'Jesus Cristo', max: 1 });
  console.log(result);

  const phrase = await randomPhrase();
  console.log(`${phrase.author}: ${phrase.text}`);
})();
```

Exemplo de retorno da busca

```json
{
  "total": 1,
  "searchTerm": "jesus_cristo",
  "phrases": [
    { "author": "Jesus Cristo", "text": "E conhecereis a verdade e a verdade vos libertará." }
  ]
}
```

## API (biblioteca)

Assinaturas principais:

```ts
type IPhrases = { author: string; text: string };
type IResult = { phrases: IPhrases[]; next: boolean };
type IOptions = { term: string; max: number };

declare function pensador(options: IOptions): Promise<{
  total: number;
  searchTerm: string;
  phrases: IPhrases[];
}>;

declare function randomPhrase(): Promise<IPhrases>;
```

Observações

- O campo `searchTerm` é o termo normalizado (slug) usado na busca.
- `max` limita o número de frases retornadas.
- Em caso de erro de rede ou estrutura inesperada no site, uma exceção é lançada.

## HTTP API (alternativa)

Para usar via HTTP, consulte também o projeto complementar:

- Repositório: https://github.com/hebertcisco/pensador-api

Exemplos

```sh
curl --location --request GET 'https://pensador-api.vercel.app/?term=Jesus+Cristo&max=7'
```

```http
GET ?term=Jesus+Cristo&max=7 HTTP/1.1
Host: pensador-api.vercel.app
```

## Desenvolvimento

Scripts úteis

- `npm test`: roda os testes (Jest)
- `npm run test:coverage`: cobertura de testes
- `npm run build`: compila para `lib/`
- `npm run lint` / `npm run lint:fix`: lint do código

## Contribuindo

Contribuições são bem-vindas!

- Leia `CONTRIBUTING.md` e `CODE_OF_CONDUCT.md`.
- Abra um issue para discutir melhorias e bugs.

## Licença

MIT. Veja `LICENSE.md`.

## Aviso legal

Este projeto faz web scraping do site Pensador apenas para fins educacionais e de uso pessoal. Respeite os termos de uso do serviço e evite sobrecarga com muitas requisições.

