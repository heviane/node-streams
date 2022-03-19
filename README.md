# Working with on-demand data with Node streams 🚀

Gerar e consumir dados sob demanda com Node Stream, de backend para backend.

Node stream são funções para processar dados sob demanda.

- **server.js**
Gera os dados com a classe **Readable** do pacote nativo **stream** do node.
  - **OBS:** O **createServer()** não manipula promises, então se der erro, vai estourar exceção não tratada.

- **client.js**
Consome os dados com **axios** e com o **responseType: 'stream'**.
Processa os dados com a classe **Transform** do pacote nativo **stream** do node.
Saída dos dados com a classe **Writable** do pacote nativo **stream** do node.
  - **OBS:** Não colocar async no método **transform()**, porque internamente ele não trabalha com função assíncrona. Se colocar, vai funcionar, mas se der uma exceção ele não vai saber como controlar e aí pode ter vazamento de memória, porque a stream não conseguiu ser fechada a tempo.
  - Se precisar de async, pode colocar promise com um then ou uma closure com callback no then no corpo do método.
  - **OBS:** Se o cliente não se adequar para receber os dados como streams, aí vai esperar receber tudo para só depois processar e fazer a saída.

## Requeriments ✅

- [Node](https://nodejs.org)
- [Axios](https://axios-http.com)
Promise based HTTP client for the browser and node.js

## Project 🚧

```bash
    #!/bin/bash

    ## Initialize the project:
    npm init

    ## Incluir o ECMAScript Modules no "package.json":
    "type":"module"

    ## Instalar o live-reloading "nodemon":
    npm install -D nodemon

    ## Criar os scripts para execução no "package.json":
    "scripts": {
        "client":"nodemon src/client.js",
        "server":"nodemon src/server.js"
    },

    ## Subir o client.js e o server.js com o nodemon em terminais separados
    npm run server
    npm run client

    ## Executar o server no terminal do client
    curl http://localhost:3000
```

## References for Credits 👍

- Youtube: [Live Coding](https://www.youtube.com/watch?v=r-33Hhbvr1M)
- Github: [ErickWendel/live-streams-beginners-guide](https://github.com/ErickWendel/live-streams-beginners-guide)

## References for Studies 📖

- Node tem classes prontas para [streams](https://nodejs.org/dist/latest-v17.x/docs/api/stream.html).
  - [Readable streams](https://nodejs.org/dist/latest-v17.x/docs/api/stream.html#readable-streams)
    - Entrada (fonte) de dados: Gera os dados.
    Ex: file, transmissão de audio ou video, etc.
    É tudo que estiver chegando.
  - [Writable streams](https://nodejs.org/dist/latest-v17.x/docs/api/stream.html#writable-streams)
    - Saída de dados: Finaliza o processo e escreve dado em algum lugar.
    Ex: console.log, mensagem, file, etc.
    É sempre a última etapa do pipeline.
  - [Transform streams](https://nodejs.org/dist/latest-v17.x/docs/api/stream.html#duplex-and-transform-streams)
    - Processamento dos dados: Transforma os dados de entrada.
    Ex: filtrar os dados, transformar em outro formato, renomear, etc.
    Sempre fica no meio.

## To Research ⁉️

- Node Stream com processos filhos.
- [UNDICI](https://undici.nodejs.org)
A HTTP/1.1 client, written from scratch for Node.js.
- **web sockets** para receber vários dados ao mesmo tempo na web.
- **web artici** para comunicar vários dados ao mesmo tempo na web.
- O browser lê o html como um arquivo e não como uma string.
- **web streams** não é tão difundido na comunidade, nem todos os devs usam.
Um pouco mais dificil que **node streams**.
