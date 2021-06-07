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

## Usage

```js
import pensador from 'pensador-promise';

try{
await pensador({ term: 'Jesus Cristo', max: 10 }).then((result) => {
  console.log(result.phrases.map((term)=>term.text));
});
}cath(err){
 console.log(err)
}
```
