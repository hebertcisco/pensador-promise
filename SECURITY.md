# Política de Segurança

## Versões com suporte

As correções de segurança são fornecidas para a menor quantidade possível de
ramificações a fim de manter o projeto sustentável. Para bibliotecas em versão
0.x, apenas o último minor recebe correções.

| Versão | Suporte            |
| ------ | ------------------ |
| 0.4.x  | :white_check_mark: |
| < 0.4  | :x:                |

Observações

- A linha 0.4.x corresponde à última versão publicada (`latest` no npm).
- Incentivamos a atualização para a versão mais recente para receber correções.

## Como reportar uma vulnerabilidade

Por favor, não abra issues ou pull requests públicos para vulnerabilidades.

- Use um aviso privado (GitHub Security Advisory):
  https://github.com/hebertcisco/pensador-promise/security/advisories/new
- Se não conseguir usar o link acima, crie um issue com o título iniciando por
  "[security]" sem detalhes sensíveis e solicite um canal privado de contato.

Ao reportar, inclua:

- Descrição clara do problema e impacto previsto.
- Passos para reproduzir e, se possível, PoC mínimo.
- Versão do pacote afetada (`npm ls pensador-promise`), ambiente e SO.
- Mitigações conhecidas ou workarounds (se houver).

## SLAs e processo de resposta

- Triagem inicial: em até 48 horas úteis.
- Atualizações de status: pelo menos semanais até a resolução.
- Correção e lançamento: de 7 a 30 dias, conforme severidade/CVSS e
  complexidade. Casos críticos podem ter hotfix imediato.

Quando apropriado, faremos divulgação coordenada, publicaremos um advisory e
citaremos contribuidores que desejarem crédito.

## Escopo

Está em escopo:

- Código e configurações deste repositório (biblioteca publicada em npm).
- Fluxos de build e publicação que afetem a integridade do pacote.

Fora de escopo (exemplos):

- Problemas de disponibilidade do site de terceiros (Pensador) ou da rede.
- Vulnerabilidades causadas por uso fora das recomendações da API.
- Typos, estilo de código, ou erros que não tenham impacto de segurança.

## Política de divulgação responsável (safe harbor)

Desde que você siga a divulgação responsável e não acesse dados de terceiros,
não interrompa serviços nem viole leis aplicáveis, não buscaremos ação legal
contra pesquisas conduzidas de boa-fé. Por favor, dê tempo razoável para a
correção antes de qualquer divulgação pública.

Obrigado por ajudar a manter este projeto e sua comunidade mais seguros.
