# Tribo Chat Event-Driven

Aplicação de chat em tempo real desenvolvida durante o curso **React: implementando arquitetura event-driven com Socket.io**.

O projeto demonstra como uma aplicação React pode se comunicar com um servidor Node.js por meio de eventos, utilizando Socket.IO para atualizar mensagens e o status online dos usuários sem precisar recarregar a página.

## O que o projeto faz

O Tribo Chat permite:

- criar uma conta;
- fazer login;
- visualizar conversas diretas;
- enviar e receber mensagens em tempo real;
- acompanhar o status online e offline dos contatos;
- manter a atualização da conversa aberta quando uma nova mensagem chega;
- detectar a desconexão de um usuário quando a aba ou a conexão é encerrada;
- marcar mensagens como lidas.

Os dados da aplicação são persistidos localmente no arquivo `server/db.json`. Portanto, este projeto tem finalidade educacional e não deve ser tratado como uma aplicação pronta para produção.

## Tecnologias utilizadas

### Frontend

- React
- Vite
- React Router
- Socket.IO Client
- Axios
- Sass
- React Icons
- Normalize.css

### Backend

- Node.js
- Express
- Socket.IO
- JSON Server
- UUID
- Faker.js

## Estrutura do projeto

```text
tribo-chat-event-driven/
├── chat/                 # Aplicação frontend React
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── server/               # API HTTP e servidor Socket.IO
│   ├── controllers/
│   ├── routes/
│   ├── socket/
│   ├── db.json
│   └── package.json
└── README.md
```

## Pré-requisitos

Antes de começar, instale:

- Git;
- Node.js, preferencialmente uma versão LTS compatível com as dependências do curso;
- npm.

Confira as versões instaladas:

```bash
node --version
npm --version
```

## Como executar depois de clonar

### 1. Clonar o repositório

```bash
git clone https://github.com/braiancalpar/tribo-chat-event-driven.git
cd tribo-chat-event-driven
```

### 2. Instalar as dependências do frontend

Em um terminal:

```bash
cd chat
npm install
```

### 3. Instalar as dependências do backend

Abra outro terminal na pasta raiz do projeto e execute:

```bash
cd server
npm install
```

### 4. Iniciar o servidor

No terminal do backend:

```bash
npm run dev
```

O servidor será iniciado na porta `8080`:

```text
http://localhost:8080
```

### 5. Iniciar o frontend

No terminal do frontend:

```bash
cd chat
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação, normalmente:

```text
http://localhost:5173
```

Abra esse endereço no navegador. O frontend está configurado para acessar a API e o Socket.IO em `http://localhost:8080`.

> O backend e o frontend precisam permanecer em execução em terminais separados.

## Scripts disponíveis

### Frontend (`chat`)

```bash
npm run dev       # Inicia o Vite em modo de desenvolvimento
npm run build     # Gera a versão de produção
npm run lint      # Executa o ESLint
npm run preview   # Serve o build de produção localmente
```

### Backend (`server`)

```bash
npm run dev       # Inicia o servidor Node.js na porta 8080
```

## Como a comunicação funciona

O frontend mantém uma conexão com o servidor usando Socket.IO. Entre os principais eventos utilizados estão:

- `save-id`: associa o usuário ao socket atual, permitindo identificar desconexões;
- `online-users`: envia ao usuário recém-conectado a lista de usuários que já estão online;
- `user-online`: informa aos outros clientes que um usuário entrou;
- `user-offline`: informa que um usuário saiu ou perdeu a conexão;
- `join-rooms`: adiciona o socket às salas das conversas;
- `new-message`: distribui uma mensagem nova para os participantes da conversa.

As mensagens são enviadas pela API HTTP e, depois de processadas pelo servidor, são distribuídas aos clientes da sala correspondente pelo Socket.IO.

## Observações sobre as dependências

Algumas dependências e versões utilizadas neste projeto estão defasadas ou foram mantidas em versões específicas para acompanhar o conteúdo e os exemplos do curso.

Essa decisão ajuda a reproduzir o ambiente apresentado nas aulas, mas pode gerar avisos de instalação, incompatibilidades com versões muito novas do Node.js ou diferenças em APIs atuais. Antes de atualizar qualquer pacote, é importante verificar:

- compatibilidade entre React, React DOM, Vite e seus plugins;
- compatibilidade entre Socket.IO Client e Socket.IO Server;
- mudanças no React Router;
- alterações no ESLint e nos plugins utilizados;
- necessidade de atualizar o código junto com a dependência.

Para seguir o curso normalmente, recomenda-se instalar as dependências descritas nos `package.json` existentes, sem atualizar automaticamente todos os pacotes.

## Melhorias futuras

Algumas evoluções possíveis para transformar o projeto em uma aplicação mais robusta seriam:

- substituir o `db.json` por um banco de dados real;
- implementar autenticação segura com sessão ou tokens;
- armazenar senhas usando hash, nunca em texto puro;
- validar e sanitizar os dados recebidos pela API;
- adicionar tratamento consistente de erros no frontend e no backend;
- separar melhor os serviços de usuários, conversas e mensagens;
- criar testes unitários, de integração e de comunicação via Socket.IO;
- adicionar paginação e carregamento incremental de mensagens;
- tratar múltiplas abas e múltiplas conexões do mesmo usuário;
- usar uma camada de presença compartilhada, como Redis, em ambientes com mais de um servidor;
- configurar variáveis de ambiente para URLs, portas e credenciais;
- adicionar logs estruturados e monitoramento;
- melhorar acessibilidade, responsividade e feedback visual;
- atualizar gradualmente as dependências, validando cada mudança.

## Finalidade educacional

Este repositório foi construído para acompanhar o curso e facilitar o estudo de uma arquitetura orientada a eventos com React e Socket.IO. As decisões de estrutura, persistência local e versões de dependências priorizam o acompanhamento das aulas e a clareza dos conceitos apresentados.
