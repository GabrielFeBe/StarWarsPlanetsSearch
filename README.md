# :construction: README em construção ! :construction:

<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto.
É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você;
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->

# Projeto de Filtros Aninhados StarWars

Este projeto React implementa filtros aninhados para visualização de planetas usando a API SWAPI (Star Wars API).

## Instalação

Certifique-se de ter o Node.js instalado. Execute o seguinte comando para instalar as dependências:

1. **Clone o projeto:**

- Clone com o seguinte comando:

```bash
git clone git@github.com:GabrielFeBe/StarWarsPlanetsSearch.git
```

2. **Instalaçao de dependencias:**

- Troque para a pasta do projeto:

```bash
cd StarWarsPlanetsSearch

```

-Instale as dependencias:

```bash
npm install
```

## Uso

1. **Executar o Projeto:**

- Inicie o aplicativo React com o seguinte comando:

```bash
      npm start
```

- O projeto estará disponível em [http://localhost:3000](http://localhost:3000).

2. **Filtros Aninhados:**

   - O aplicativo permite filtrar planetas com base em letras no campo de filtro ou utilizar filtros avançados, como ordenação, comparação e operadores.

3. **Tabela de Planetas:**
   - A tabela exibe informações detalhadas dos planetas, incluindo nome, período de rotação, período orbital, diâmetro, clima, gravidade, terreno, água superficial, população, filmes associados, data de criação, data de edição e URL.

## Componentes Principais

### 1. Home (Página Principal)

- Componente principal que integra a aplicação, incluindo um cabeçalho com gráfico e logotipo, um campo de filtro por letra e os componentes de filtro e tabela.

### 2. StarProvider (Provedor de Contexto)

- Fornece contexto para o aplicativo, gerenciando o estado dos planetas e filtros.

### 3. Filter (Componente de Filtro)

- Permite a aplicação de filtros avançados, incluindo seleção de coluna, operador de comparação, valor, e remoção de filtros aplicados.

### 4. Table (Tabela de Planetas)

- Exibe uma tabela com informações detalhadas dos planetas, permitindo a visualização dos dados filtrados.
