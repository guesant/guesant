# Convenções do repositório

Edite o gerador TypeScript em `tools/readme-generator`. O README e os cards são gerados pelo workflow. Preserve os filtros de publicação e o contrato das fontes Lobby e Resume.

Execute as ferramentas do projeto em Docker. Use os targets do Compose descritos na documentação para desenvolver, formatar, testar e construir. Execute `just` dentro da imagem que fornece a ferramenta.

Siga Conventional Commits com escopo e título em inglês, no imperativo, com até 72 caracteres. Use um título por commit e peça autorização antes de criar commits. Mantenha a revisão de código e a automação restritas às mudanças pedidas.

Mantenha o código livre de comentários narrativos. Reserve comentários para diretivas de ferramentas, avisos legais e invariantes críticos marcados com `IMPORTANT:`. Na documentação, desenvolva uma ideia por parágrafo, contextualize termos e use listas quando a ordem ou a comparação ajudar. Prefira prosa direta, sem travessões decorativos nem tom promocional.

Registre a origem das configurações e dos pins. Trate segredos como dados fornecidos em tempo de execução. Preserve os limites dos gates e corrija os achados antes da publicação.

Consulte os [comandos Docker e as origens do tooling](docs/tooling.md).
