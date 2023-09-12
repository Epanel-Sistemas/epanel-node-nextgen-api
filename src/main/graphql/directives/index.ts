import { defaultFieldResolver } from 'graphql'
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'

import env from '@/config/env'

import { JwtProvider } from '@/infra/providers'
import { makeGetUserById } from '@/main/factories'

export const authDirective = (schema, directiveName) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(
        schema,
        fieldConfig,
        directiveName
      )?.[0]
      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig
        fieldConfig.resolve = async function (source, args, context, info) {
          const accessToken = context?.req?.headers?.['authorization']

          if (!accessToken) {
            throw new Error('No access token provided')
          }

          const jwtProvider = new JwtProvider()
          const jwtUser = await jwtProvider.decryptToken(
            accessToken,
            env.jwtSecret
          )

          if (!jwtUser) {
            throw new Error('Not authorized')
          }

          const user = await makeGetUserById().execute(parseInt(jwtUser.id))

          if (!user) {
            throw new Error('Not authorized')
          }

          return resolve(
            source,
            args,
            Object.assign(context, {
              userId: user.id
            }),
            info
          )
        }
        return fieldConfig
      }
    }
  })
}
