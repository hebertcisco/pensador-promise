<p align="center">
 <img width="100px" src="https://raw.githubusercontent.com/hebertcisco/pensador-promise/main/.github/images/favicon512x512-pensador.png" align="center" alt=":package: pensador-promise" />
 <h2 align="center">:package: pensador-promise</h2>
 <p align="center">Frases vindas do Pensador via WebScraping</p>
</p>

  <p align="center">
    <a href="https://github.com/hebertcisco/pensador-promise/issues">
      <img alt="Issues" src="https://img.shields.io/github/issues/hebertcisco/pensador-promise?style=flat&color=336791" />
    </a>
    <a href="https://github.com/hebertcisco/pensador-promise/pulls">
      <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/hebertcisco/pensador-promise?style=flat&color=336791" />
    </a>
     <a href="https://github.com/hebertcisco/pensador-promise">
      <img alt="GitHub Downloads" src="https://img.shields.io/npm/dw/pensador-promise?style=flat&color=336791" />
    </a>
    <a href="https://github.com/hebertcisco/pensador-promise">
      <img alt="GitHub Total Downloads" src="https://img.shields.io/npm/dt/pensador-promise?color=336791&label=Total%20downloads" />
    </a>
    <br />
    <br />
  <a href="https://github.com/hebertcisco/pensador-promise/issues/new/choose">Report Bug</a>
  <a href="https://github.com/hebertcisco/pensador-promise/issues/new/choose">Request Feature</a>
  </p>

<p align="center">Did you like the project? Please, considerate <a href="https://www.buymeacoffee.com/hebertcisco">a donation</a> to help improve!</p>

<p align="center"><strong>Frases vindas do Pensador via WebScraping</strong>✨</p>

# Getting started

[![codecov](https://codecov.io/gh/hebertcisco/pensador-promise/branch/main/graph/badge.svg?token=ETOV4Z3YZQ)](https://codecov.io/gh/hebertcisco/pensador-promise)

[![Running Code Coverage](https://github.com/hebertcisco/pensador-promise/actions/workflows/coverage.yml/badge.svg)](https://github.com/hebertcisco/pensador-promise/actions/workflows/coverage.yml)

[![Node.js build and publish package](https://github.com/hebertcisco/pensador-promise/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/hebertcisco/pensador-promise/actions/workflows/npm-publish.yml)

## Install

```sh
npm i pensador-promise
```
Or

```sh
yarn add pensador-promise
```

## API

[Repositório da API](https://github.com/hebertcisco/pensador-api)

## Usage

```js
import pensador from 'pensador-promise';

 async retornaFrase(termo) {
    const phrase = await pensador(
      {
        term: termo,
        max: 1
      });
    return(phrase);
 }
 try{
  console.log(retornaFrase("Jesus Cristo"));
 }catch(err){
  console.error(err);
 }
```
### Retorno:

```json
{
  "termoDePesquisa": "frases_de_jesus_cristo",
  "total": 1,
  "frases": [
    {
      "autor": "Jesus Cristo",
      "texto": "E conhecereis a verdade e a verdade vos libertará."
    }
  ]
}
```
## HTTP API

> Curl

```sh
curl --location --request GET 'https://pensador-api.vercel.app/?term=Jesus+Cristo&max=7'
```

> HTTP

```http
GET ?term=Jesus+Cristo&max=7 HTTP/1.1
Host: pensador-api.vercel.app
```

> URL: [https://pensador-api.vercel.app/?term=Jesus+Cristo&max=7](https://pensador-api.vercel.app/?term=Jesus+Cristo&max=7)

### Endpoint:

`?term=[termo_de_pesquisa]&max=[maximo_de_resultados]`

### Retorno
```json
{
  "termoDePesquisa": "frases_de_jesus_cristo",
  "total": 7,
  "frases": [
    {
      "autor": "Jesus Cristo",
      "texto": "E conhecereis a verdade e a verdade vos libertará."
    },
    {
      "autor": "Jesus Cristo",
      "texto": "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que n'Ele crê não pereça, mas tenha a vida eterna."
    },
    {
      "autor": "Jesus Cristo",
      "texto": "Pai, perdoa-lhes, porque não sabem o que fazem."
    },
    {
      "autor": "Jesus Cristo",
      "texto": "Eu sou a ressurreição e a vida. Quem crê em mim, ainda que morra, viverá; e quem vive e crê em mim nunca morrerá."
    },
    {
      "autor": "Jesus Cristo",
      "texto": "De que serve ao homem conquistar o mundo inteiro se perder a alma?"
    },
    {
      "autor": "Jesus Cristo",
      "texto": "Ame seus inimigos, faça o bem para aqueles que te odeiam, abençoe aqueles que te amaldiçoam, reze por aqueles que te maltratam. Se alguém te bater no rosto, ofereça a outra face."
    },
    {
      "autor": "Jesus Cristo",
      "texto": "Conselhos ruins podem acabar com um dia, um ano ou uma vida inteira."
    }
  ]
}
```
