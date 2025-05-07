## Description

It is a simple library API.

### endpoints:

```bash
/books
/books/:id
```

for POST and PUT methods choose x-www-form-urlencoded as body type and add name/authorIds fields.
check books.controller.ts for more insight.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Database

Make sure docker/docker-compose installed on your system.

```bash
$ "start:dev": "docker-compose up -d && nest start --watch"
```

```
$ npm run start:dev
```

command starts a database (defined in docker-compose.yml) and thanks to typeorm packet tables are automatically created.
You can insert some data manually (example init/create-tables.sql).

## env

Create an .env file in root folder and fill these values:

```
PORT = 3000
DB_USER = 'postgres'
DB_PASSWORD = 'postgres'
DB_NAME = 'librarydb'
```
