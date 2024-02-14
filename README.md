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

# Testes Automatizados

**Observação:** Após a adição do Tailwind CSS e a mudança de alguns nomes, alguns testes podem estar quebrados.

## Executando os Testes

Certifique-se de ter as dependências instaladas antes de executar os testes.

Execute os testes com o seguinte comando:

- Lembre-se de instalar as dependencias antes de rodar os testes.

```bash
npm test
```

## Descrição do Teste

Este teste verifica a funcionalidade do filtro e ordenação de planetas no aplicativo React. O ambiente de teste utiliza uma API mockada para simular as chamadas à API SWAPI.

### Passos do Teste

1. **Renderização do Aplicativo:**

   - O aplicativo é renderizado dentro do `StarProvider` para gerenciar o estado dos planetas.

2. **Acesso ao Planeta Tatooine:**

   - Aguarda a exibição do planeta Tatooine para garantir que a renderização ocorreu corretamente.

3. **Interações de Usuário:**

   - Utiliza a biblioteca `userEvent` para simular interações do usuário, como digitar no campo de filtro, selecionar opções de ordenação e filtrar.

4. **Validação dos Resultados:**

   - Verifica se os elementos esperados estão presentes ou ausentes após as interações do usuário.

5. **Limpeza de Filtros:**
   - Testa a funcionalidade de remover filtros e verifica se os resultados são restaurados.

**Observação:** Este teste está sujeito a quebras devido a mudanças no código, especialmente após a adição do Tailwind CSS e alterações nos nomes de elementos. Certifique-se de atualizar os seletores de acordo com as mudanças realizadas no código, eu arrumei os seletores que vi mas vai saber.
