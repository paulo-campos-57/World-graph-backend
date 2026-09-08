<div align="center">
  <h1>
    <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/Neo4j-008CC1?style=for-the-badge&logo=neo4j&logoColor=white" />
    <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
    <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" />
    <img src="https://img.shields.io/badge/Clean%20Architecture-2E7D32?style=for-the-badge" />
    <br>
    World Graph - Backend 🇺🇸
  </h1>
  <p>Repository for the backend of the world graph application</p>
</div>

## 🧪 Code Contribution Guidelines
To maintain code quality and application stability aligned with Clean Architecture principles, please follow these guidelines when contributing:

* **Mandatory Test Coverage:** Every new feature, *Value Object*, *Entity*, *Use Case* or bug fix must be submitted with its corresponding unit and/or integration tests.
* **Passing Tests:** No Pull Request (PR) or commit to the main branch will be merged if tests are failing. Make sure the entire test suite passes locally before pushing your changes.
* **Structure:** Tests must follow the project's established folder structure within the `tests/` directory or alongside the source code.

**Command to run tests:**

```bash
# Run unit test suite
npm run test

# Run tests with coverage report
npm run test:cov
```

## 📝 Commit Convention

All commit messages must strictly adhere to the following pattern:

```Plaintext
[TAG] - description of what was done
```

**Common Tags:**
- `[FEAT]`/`[ADD]` - New features, endpoints, or file additions.
- `[FIX]` - Bug fixes, corrections, or removing unnecessary files.
- `[TEST]` - Adding or updating unit/integration tests.
- `[REFACTOR]` - Code restructuring without changing behavior or adding features.
- `[DOCS]` - Documentation updates (e.g., README, API docs).
- `[CHORE]` - Maintenance tasks, dependency updates, build/tooling configuration.
- `[STYLE]` - Code formatting, lint fixes, whitespace (no functional logic changes).

**Examples:**
- `[FEAT] - implement user authentication use case`
- `[TEST] - create unit tests for bio VO`
- `[ADD] - include dependencies and structure for tests`
- `[REFACTOR] - adapt test folder structure`
- `[FIX] - remove name.spec`
- `[DOCS] - update commit guidelines in README`

---

<div align="center">
  <h1>
    <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/Neo4j-008CC1?style=for-the-badge&logo=neo4j&logoColor=white" />
    <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
    <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" />
    <img src="https://img.shields.io/badge/Clean%20Architecture-2E7D32?style=for-the-badge" />
    <br>
    World Graph - Backend 🇧🇷
  </h1>
  <p>Repositório para o backend da aplicação world graph</p>
</div>

## 🧪 Diretrizes para Subida de Código e Testes
Para manter a qualidade do código e a estabilidade da aplicação alinhadas aos princípios de **Clean Architecture**, siga as regras abaixo ao enviar novas contribuições:

* **Cobertura Obrigatória de Testes:** Todo novo recurso (*feature*), *Value Object*, *Entity*, *Use Case* ou correção de bug (*bugfix*) deve ser enviado acompanhado dos seus respectivos testes unitários e/ou de integração.
* **Execução dos Testes:** Nenhum Pull Request (PR) ou *commit* na branch principal será aceito se os testes estiverem falhando. Certifique-se de que toda a suíte de testes está passando localmente antes de enviar o código.
* **Estrutura:** Os testes devem seguir a organização estabelecida no projeto na pasta `tests/` ou adjacentes ao código.

**Comando para rodar os testes:**

```bash
# Executa a suíte de testes unitários
npm run test

# Executa os testes e verifica a cobertura
npm run test:cov
```

## 📝 Padronização de Commits

Todas as mensagens de commit devem seguir estritamente o seguinte padrão:

```Plaintext
[TAG] - descrição do que foi feito
```

**Common Tags:**
- `[FEAT]`/`[ADD]` - Novas funcionalidades, endpoints ou adição de arquivos/estruturas.
- `[FIX]` - Correção de bugs, erros ou remoção de arquivos desnecessários/quebrados.
- `[TEST]` - Criação ou alteração de testes unitários/integração.
- `[REFACTOR]` - Refatoração de código sem alterar o comportamento externo (melhorias estruturais).
- `[DOCS]` - Alterações na documentação (ex: README, documentação de APIs).
- `[CHORE]` - Tarefas de manutenção, atualização de dependências ou configurações de build/ferramentas.
- `[STYLE]` - Formatação de código, ajustes de lint ou espaços em branco (sem mudança na lógica).

**Exemplos:**
- `[FEAT] - implement user authentication use case`
- `[TEST] - create unit tests for bio VO`
- `[ADD] - include dependencies and structure for tests`
- `[REFACTOR] - adapt test folder structure`
- `[FIX] - remove name.spec`
- `[DOCS] - update commit guidelines in README`
