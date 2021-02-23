<h1 align="center">API GITHUB</h1>

<h1 align="center">
    <a href="https://nodejs.org">🔗 node</a>
</h1>

<p align="center">JOIN!</p>



<hr>
<p id="pre">
caro avaliador, na tabela repository não fui capas de usar a palavra public como um campo, pois essa palavra é restrita a classes do typescript, entao substitui pela palavra open !
  
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone <https://github.com/Gabrielfrahm/teste-estagio-luby>

# Acesse a pasta do projeto no terminal/cmd
$ cd teste-estagio-luby

# Instale as dependências
$ yarn

# Execute a aplicação em modo de desenvolvimento
$ yarn dev:server

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>
```
### 🎲 Rodando o Back End (build)
```bash
# Caso queira rodar o Build
$ yarn build

# Ira gerar o código JS na pasta dist
# Mude as config do arquivo ormconfig.json apontando para a pasta dist e arquivos JS
$ "entities": [
      "./dist/modules/**/infra/typeorm/entities/*.js"
    ],
    "migrations": [
      "./dist/shared/infra/typeorm/migrations/*.js"
    ],
    "cli": {
      "migrationsDir": "./dist/shared/infra/typeorm/migrations"
  }

# Execute a aplicação em modo de build
$ node dist/shared/infra/http/server.js

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>
```


</p>
<hr>
<p id="tec">
🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)

</p>
