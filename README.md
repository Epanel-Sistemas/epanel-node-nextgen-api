# Epanel Node Nextgen API

## Engineering

### Tech stack
- [Node](https://github.com/nodejs/node)
- [Express](https://github.com/expressjs/express)
- [GraphQL](https://github.com/graphql/graphql-js)
- [Apollo Server](https://github.com/apollographql/apollo-server)
- [Typescript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)

## Dependencies
- Node js => v16
- Yarn

## Up and Running

**Setup local environment**
- Install dependencies `yarn`
- Create `.env` file based on `.env.example`
- Setup a local postgres database and set `DATABASE_URL` env pointing up to your instance
- Run `npx prisma db push` to proper synchronize your database with your schema

## Useful tip
- Run `npx prisma studio` to have a bult-in database client

## Available scripts
- `yarn start (or npm start)`: Run server in production mode
- `yarn dev (or npm dev)`: Run server in development mode
- `yarn build (or npm run build)`: Generate production build (files will be available on `build` directory)
- `yarn lint (or npm run lint)`: Run linter based on eslint configurations
- `yarn lint:fix (or npm run lint:fix )`: Run linter and fix errors
