# Template Inicial Jest

- [x] - Trabalha com ES Modules
- [x] - Possui live reload
- [x] - Possui debug com VSCode
- [x] - Possui suporte para debug com navegadores
- [x] - Adaptado para Yarn

# Rodando

## Versão validada

Check se está usando o Node.js LTS (neste momento é o 18)

```shell
node -v
# v18.19.0
```

caso não tenha Node.js instalado, execute a instalação do `NVM`

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

com o `NVM` instalado, execute a instalação do Node.js LTS e ative a versão

```shell
nvm install 18
nvm use 18
nvm ls
```

**Importante**: para usuário Windows é recomendável sempre utilizar `WSL2` ao executar este tutorial

## Abra pasta do repositório

Acesse a pasta do seu repositório e abra o VSCode

```shell
cd caminho-do-repositorio
code .
```

dentro do VSCode, abra o terminal e instale os pacotes

```shell
npm install -g ntl
npm install -g yarn
yarn
yarn add --dev jest
yarn add --dev cross-env
```

acesse [package.json] e altere `scripts`, `type` e `engines` (opcional `author`) seguindo este exemplo

```json
"scripts": {
  "test": "cross-env NODE_OPTIONS=--experimental-vm-modules jest --injectGlobals false --runInBand test/",
  "test:dev": "cross-env NODE_OPTIONS=--experimental-vm-modules jest --injectGlobals false --runInBand --watchAll test/",
  "test:debug": "cross-env node --experimental-vm-modules --inspect-brk node_modules/.bin/jest --injectGlobals false --runInBand --watchAll test/"
},
"author": "seu-nome",
"type": "module",
"engines": {
  "node": "v18.19.0"
},
```

### Executando testes em modo de execução

Para executar os testes em modo live reload

```shell
yarn test:dev
```

ou apenas executá-los

```shell
yarn test
```

utilizando Node Task List

```shell
ntl # seleciona o comando para executar
nt # repete último comando selecionado
```

## Depuração e Live reload no VSCode

A pasta [.vscode] deve ser criada na raiz do projeto.

```shell
mkdir .vscode
```

dentro da pasta [.vscode], crie um arquivo [tasks.json]

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "run-project-tests",
      "type": "shell",
      "command": "bash",
      "args": [
        "-c",
        "PROJECT_DIR=$(dirname ${file}); cd \"${PROJECT_DIR}\"; yarn test:debug"
      ],
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "presentation": {
        "reveal": "always",
        "panel": "shared"
      },
      "problemMatcher": []
    }
  ]
}
```

na mesma pasta, crie um arquivo [launch.json]

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Attach to Node.js Debug Port",
      "request": "attach",
      "port": 9229,
      "type": "node",
      "skipFiles": [
        "<node_internals>/**",
        "${workspaceFolder}/node_modules/**/*.js"
      ],
      "smartStep": true,
      "internalConsoleOptions": "openOnSessionStart",
      "restart": true
    }
  ]
}
```

Reinicie o VSCode para aplicar as alterações

### Ligando a suite de testes

Por padrão, seguindo a configuração do arquivo [tasks.json], o VSCode vai tentar rodar a suite de testes localizada no **arquivo em que você abrir**.

Abra o [test/template.test.js] em seguida pressione `Command` (ou `Control` se Windows) `Shift B` para ligar a tarefa de rodar os testes na pasta do arquivo em foco.

Seu terminal deverá aparecer algo como:

```shell
 *  Executing task: bash -c 'PROJECT_DIR=$(dirname /home/seu-nome/caminho-do-repositorio/test/template.test.js); cd "${PROJECT_DIR}"; yarn test:debug'

yarn run v1.22.21
$ cross-env node --experimental-vm-modules --inspect-brk node_modules/.bin/jest --runInBand --watchAll test/
Debugger listening on ws://127.0.0.1:9229/904bf244-f956-47be-8b4b-50373b7b4133
For help, see: https://nodejs.org/en/docs/inspector

```

### Plugando o modo debug aos testes

Agora que o projeto está aguardando conexões, aperte `F5` e o VSCode vai pausar na linha contendo a palavra chave `debugger` ou em algum breakpoint que você definir.

Depois é só apertar `F5` novamente para deixar os testes terminarem sua execução.

Sua aba `terminal` do VSCode vai estar similar ao output abaixo:

```shell
Test Suites: 0 of 1 total
Tests:       0 to
 RUNS  ...mplate.
test.js

Debugger attached.

 RUNS  ...mplate.
test.js

Test Suites: 0 of
 RUNS  ...mplate.
test.js

Test Suites: 0 of
 RUNS  ...mplate.
test.js

Test Suites: 0 of
 RUNS  ...mplate.
test.js

Test Suites: 0 of
 RUNS  ...mplate.
test.js

(node:440773) ExperimentalWarning: VM Modules is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)

 RUNS  ...mplate.
test.js

 PASS  test/template.test.js

 RUNS  ...mplate.
test.js

  ✓ deve somar dois valores (3843 ms)

 RUNS  ...mplate.
test.js

Test Suites: 0 of

 RUNS  ...mplate.
test.js

Waiting for the debugger to disconnect...

 RUNS  ...mplate.
test.js

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        4.553 s, estimated 45 s
Ran all test suites matching /test\//i.

Active Filters: filename /test//
 › Press c to clear filters.

Watch Usage
 › Press f to run only failed tests.
 › Press o to only run tests related to changed files.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.

```

### Parando

- Para parar os testes basta rodar `Ctrl C` na aba `terminal` do VSCode
- Para desconectar o debugger pressione `Shift F5` no VSCode

https://jestjs.io/docs/ecmascript-modules
