import {
  makeAuthentication,
  makeCreateUser,
  makeGetUserById
} from '@/main/factories'

export default {
  Query: {
    login: (_, args) => makeAuthentication().execute(args),

    user: (_, __, ctx) => makeGetUserById().execute(ctx.userId)
  },
  Mutation: {
    createUser: (_, args) => makeCreateUser().execute(args.user)
  }
}
