## Como contribuir

Obrigado por dedicar seu tempo para contribuir! Este guia descreve como relatar problemas, propor melhorias e abrir Pull Requests de forma produtiva.

## Formas de contribuir

- Reportar bugs e problemas de segurança
- Sugerir novas funcionalidades ou melhorias
- Enviar correções de código, testes e documentação
- Revisar Pull Requests de outras pessoas

## Antes de começar

- Respeite o `CODE_OF_CONDUCT.md`.
- Verifique issues e PRs abertos para evitar duplicidade.
- Abra uma issue para discutir mudanças maiores antes de implementar.

## Ambiente de desenvolvimento

Requisitos

- Node.js 18, 19, 20, 21 ou 22
- npm

Setup

```sh
git clone https://github.com/hebertcisco/pensador-promise.git
cd pensador-promise
npm ci
npm test
```

Scripts úteis

- `npm test` — executa testes
- `npm run test:coverage` — cobertura de testes
- `npm run build` — compila para `lib/`
- `npm run lint` / `npm run lint:fix` — lint do código

## Convenções de código

- TypeScript estrito (veja `tsconfig.json`)
- Estilo: ESLint + Prettier
- Evite regressões: adicione/atualize testes quando alterar comportamento

Commits

- Use mensagens claras e no imperativo (ex.: "add fetch retry logic")
- Opcional: padrão Conventional Commits (ex.: `feat:`, `fix:`, `docs:`)

## Abrindo um Pull Request

Checklist

- Inclui descrição do problema e da solução proposta
- Atualiza ou adiciona testes quando necessário
- Passa em `npm test` e `npm run lint`
- Atualiza documentação (README/CHANGELOG) quando aplicável

Processo

1. Crie um branch descritivo a partir de `main`
2. Faça commits pequenos e focados
3. Abra o PR para `main` vinculando a issue (ex.: "Closes #123")
4. Aguarde revisão; responda feedbacks e faça ajustes

## Reportando bugs

Inclua no relatório:

- Versão da biblioteca (`npm ls pensador-promise`)
- Ambiente (SO, versão do Node)
- Passos para reproduzir, comportamento atual e esperado
- Logs, trechos de código e links úteis

Segurança

- Para vulnerabilidades, reporte de forma privada por email: <opensource@hotbrains.com.br>

## Publicação e releases

O pacote é publicado via GitHub Actions quando um release é criado. Evite commitar arquivos gerados em `lib/` — a pipeline cuida da construção.

## Dúvidas

Abra uma issue com a tag `question` ou entre em contato por email: <opensource@hotbrains.com.br>
