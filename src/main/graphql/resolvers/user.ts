import {
  makeAuthenticate,
  makeCreateUser,
  makeGetUserById
} from '@/main/factories'

export default {
  Query: {
    login: (_, args) => makeAuthenticate().execute(args),

    user: (_, __, ctx) => makeGetUserById().execute(ctx.userId)
  },
  Mutation: {
    createUser: (_, args) => makeCreateUser().execute(args.user)
  }
}
