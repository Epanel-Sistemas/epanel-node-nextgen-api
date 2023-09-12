import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import { makeExecutableSchema } from '@graphql-tools/schema'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'

import resolvers from '@/main/graphql/resolvers'
import typeDefs from '@/main/graphql/type-defs'
import { authDirective } from '@/main/graphql/directives'
import env from '@/config/env'

export const startServer = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  })

  const schemaWithAuthDirective = authDirective(schema, 'auth')

  const server = new ApolloServer({
    schema: schemaWithAuthDirective,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  await server.start()

  app.use(cors(), bodyParser.json())
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => ({ req })
    })
  )

  await new Promise((resolve) =>
    httpServer.listen({ port: env.port }, () => {
      resolve('Ready')
    })
  )

  console.log(`🚀 Server ready at http://localhost:${env.port}/graphql`)
}
