# game_station_back_end
Online Game Station Developed in Node.js (BackEnd)

# Passo a passo para criação do Projeto Completo:
Utilizando Node.js, Express, Jest, TypeScript, Docker, Nodemon, dotenv e banco de dados MySQL (rodando como container Docker).

## Configuração do ambiente:
Certifique-se de ter o Node.js e o Docker instalados em sua máquina.

## Crie um novo diretório para o projeto e navegue até ele:
Execute os comandos no terminal:
### `mkdir my-node-project`
### `cd my-node-project`

## Inicialize o projeto Node.js com o npm:
Execute o comando no terminal:
### `npm init -y`

## Instale as dependências:
Execute os comandos no terminal:
### `npm install express`
### `npm install typescript ts-node @types/node @types/express`
### `npm install jest ts-jest @types/jest`
### `npm install mysql2` ou `npm install mysql`
### `npm install nodemon`
### `npm install dotenv`
ou
### `npm install express jest ts-jest typescript ts-node @types/node @types/express @types/jest nodemon dotenv mysql2`

## Configuração do TypeScript:
Crie um arquivo tsconfig.json na raiz do seu projeto com a configuração do TypeScript. Por exemplo:

{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}

## Crie os diretórios necessários:
Execute os comandos no terminal. Por exemplo:
### `mkdir src`
### `mkdir src/routes`
### `mkdir src/controllers`
### `mkdir src/database`

## Configuração do Nodemon:
Crie um arquivo nodemon.json na raiz do projeto para configurar o Nodemon:

{
  "watch": ["src"],
  "ext": "ts",
  "ignore": ["src/**/*.test.ts"],
  "exec": "ts-node src/index.ts"
}

## Configuração dos Scripts npm:
Adicione scripts úteis ao package.json:

"scripts": {
  "build": "tsc",
  "start": "node dist/index.js",
  "dev": "nodemon",
  "test": "jest"
}

## Configure o environment do projeto:
Crie um arquivo .env na raiz do seu projeto para armazenar as variáveis de ambiente, como as credenciais do banco de dados. Por exemplo:

PORT=3000
DB_HOST=mysql
DB_USER=root
DB_PASSWORD=password
DB_NAME=mydatabase

## Configuração do Banco de Dados MySQL:
Crie um arquivo src/database/db.ts para a conexão com o banco de dados MySQL.
Implemente a conexão com o MySQL: No arquivo src/database/db.ts, implemente a lógica para se conectar ao banco de dados MySQL. Certifique-se de utilizar as variáveis de ambiente definidas no arquivo .env para as credenciais de conexão. Por exemplo:

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connected to the database');
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
};

## Crie seu servidor Express:
Crie um arquivo src/index.ts para configurar o servidor Express e definir as rotas. Por exemplo:

import express from 'express';
import { connectToDatabase } from './database/db';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute('SELECT 1 + 1 AS solution');
        res.json(rows);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

## Configuração do Jest e dos Testes:
Configure Jest criando um arquivo jest.config.js na raiz do projeto. Por exemplo:

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
};

Crie a pasta de testes:
mkdir tests

Crie arquivos de testes (por exemplo: tests/app.test.ts) usando Jest para testar suas rotas, controladores e quaisquer outras funcionalidades importantes:

test('Example test', () => {
  expect(1 + 1).toBe(2);
});

## Configure o Docker:
Crie um arquivo Dockerfile na raiz do seu projeto para definir a configuração do contêiner Docker. Por exemplo:

FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

Crie um arquivo docker-compose.yml na raiz do projeto. Este arquivo será usado para definir e executar vários serviços do Docker. Por exemplo:

version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules
    environment:
      - NODE_ENV=development
      - PORT=3000
      - DB_HOST=mysql
      - DB_USER=root
      - DB_PASSWORD=password
      - DB_NAME=mydatabase
    command: npm run dev
    depends_on:
      - mysql

  mysql:
    image: mysql:latest
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: mydatabase
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql

volumes:
  mysql-data:

Construa a imagem Docker:
### `docker-compose build`

Execute o contêiner:
### `docker-compose up`

## Inicie o servidor:
Execute o servidor usando Nodemon ou Docker, dependendo da sua escolha de ambiente de desenvolvimento. Por exemplo:

### `npm run dev`
ou
### `docker-compose up --build`

E acessar o servidor em http://localhost:3000.

## Teste e Verificação:
Você pode agora testar seu projeto rodando os testes:
### `npm test`