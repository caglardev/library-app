## Description

It is a simple library API.

### endpoints:

```bash
/books
/books/:id
/search/book?query=test
/borrows
/user/:id
/user/:id/books
/user/:id/books?from=YYYY-MM-DD&to=YYYY-MM-DD
```

for POST and PUT methods choose x-www-form-urlencoded as body type and add name/authorId/amounOfPictures fields.

to DELETE make a request to /books/:id endpoint.

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
Make a request to http://localhost:3000/create-fake-data to add fake books, comic books and authors.

## env

Create an .env file in root folder and fill these values:

```
PORT =
DB_USER =
DB_PASSWORD =
DB_NAME =
```

TODO: unit tests
