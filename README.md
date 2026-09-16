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
  <p>A robust backend solution engineered to orchestrate complex TTRPG (Tabletop Role-Playing Game) campaign environments. World Graph replaces traditional tabular storage by leveraging a graph database architecture to map intricate entity relationships—visually connecting characters, factions, locations, lore nodes, and plot hooks into an interactive narrative network. Built strictly around Clean Architecture principles to guarantee high testability, maintainability, and total independence between core business logic and external infrastructure.</p>
</div>

## 🏛️ Project Structure & Architecture

The application is organized strictly following **Clean Architecture** principles, ensuring clear boundaries, high maintainability, and total independence between business logic and external frameworks.

```plaintext
src/
├── adapters/          # Interface Adapters (Controllers & Presenters)
├── core/              # Application Core (Domain & Business Logic)
│   ├── domain/        # Enterprise Business Rules (Entities & Value Objects)
│   └── use-cases/     # Application Business Rules (Use Cases per feature)
├── infra/             # External Frameworks, Drivers & Database Connections
└── tests/             # Unit and Integration Test Suites****
```

### Layer Responsibilities
- `core/domain` (Domain Layer): The innermost layer containing the core business rules and domain invariants.
  - `entities/`: Core domain objects representing key business concepts (`User`, `Character`, etc.).
  - `value-objects/`: Immutable objects encapsulated with strict self-validation logic (`Email`, `Password`, `HitPoints`, `Attribute`, etc.).
- `core/use-cases` (Use Cases Layer): Contains application-specific business rules. Each use case orchestrates domain entities and value objects to execute a specific feature or workflow (e.g., user registration, authentication).
- `adapters` (Interface Adapters Layer): Translates data between the format most convenient for use cases and entities, and the format most convenient for external agents.
  - `controllers/`: Receives requests, triggers use cases, and handles incoming input.
  - `presenters/`: Formats and sanitizes application output for API clients.
- `infra` (Infrastructure Layer): Contains external details and driver implementations.
  - `database/`: Database connections, schemas, ORMs, and repository implementations (PostgreSQL & Neo4j).
  - `http/`: NestJS HTTP servers, routing, framework modules, and middleware setup.
- `tests` (Testing Directory): Mirrors the domain and use-case structure to ensure comprehensive unit and integration test coverage.

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
  <p>
    Uma solução de backend robusta projetada para orquestrar ecossistemas complexos de campanhas de RPG de Mesa (TTRPG). O World Graph transcende as estruturas tabulares tradicionais ao utilizar uma arquitetura de banco de dados em grafos para mapear relacionamentos entre entidades—conectando visualmente personagens, facções, locais, elementos de lore e ganchos de trama em uma rede narrativa interativa. Desenvolvido estritamente sob os princípios da Clean Architecture, garantindo alta testabilidade, manutenibilidade e total independência entre a lógica de negócios e a infraestrutura externa.
  </p>
</div>

## 🏛️ Estrutura do Projeto e Arquitetura

A aplicação está organizada estritamente sob os princípios da **Clean Architecture**, garantindo limites claros, alta manutenibilidade e total independência entre a lógica de negócios e frameworks externos.

```plaintext
src/
├── adapters/          # Adaptadores de Interface (Controllers & Presenters)
├── core/              # Núcleo da Aplicação (Domínio e Regras de Negócio)
│   ├── domain/        # Regras de Negócio de Domínio (Entidades e Value Objects)
│   └── use-cases/     # Regras de Negócio de Aplicação (Casos de Uso por funcionalidade)
├── infra/             # Frameworks Externos, Drivers e Conexões com Banco
└── tests/             # Suíte de Testes Unitários e de Integração
```

### Responsabilidade das Camadas
- `core/domain` (Camada de Domínio): A camada mais interna contendo as regras de negócio puras e invariantes do domínio.
  - `entities/`: Objetos centrais de domínio que representam os conceitos principais do sistema (`User`, `Character`, etc.).
  - `value-objects/`: Objetos imutáveis encapsulados com lógica estrita de autovalidação (`Email`, `Password`, `HitPoints`, `Attribute`, etc.).
- `core/use-cases` (Camada de Casos de Uso): Contém as regras de negócio específicas da aplicação. Cada caso de uso orquestra entidades e objetos de valor para executar uma ação ou fluxo específico (ex: cadastro de usuário, autenticação).
- `adapters` (Camada de Adaptadores de Interface): Converte os dados do formato conveniente para os casos de uso para o formato exigido por agentes externos.
  - `controllers/`: Recebe requisições externas, aciona os casos de uso e trata os dados de entrada.
  - `presenters/`: Formata e higieniza as respostas enviadas para os clientes da API.
- `infra` (Camada de Infraestrutura): Contém os detalhes técnicos externos e implementações de drivers.
  - `database/`: Conexões com bancos de dados, schemas, ORMs e implementações reais de repositórios (PostgreSQL e Neo4j).
  - `http/`: Servidores HTTP NestJS, rotas, módulos do framework e middlewares.
- `tests` (Diretório de Testes): Espelha a estrutura do domínio e dos casos de uso para garantir cobertura abrangente de testes unitários e de integração.

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
