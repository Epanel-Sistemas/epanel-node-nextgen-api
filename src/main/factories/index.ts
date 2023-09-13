import { Authenticate, CreateUser, GetUserById } from '@/domain/services'
import { UserRepository } from '@/infra/repositories'
import { HashProvider, JwtProvider, UniqueIdProvider } from '@/infra/providers'

export const makeAuthenticate = () => {
  const userRepository = new UserRepository()
  const hashProvider = new HashProvider()
  const jwtProvider = new JwtProvider()
  return new Authenticate(userRepository, hashProvider, jwtProvider)
}

export const makeCreateUser = () => {
  const userRepository = new UserRepository()
  const hashProvider = new HashProvider()
  const uniqueIdGenerator = new UniqueIdProvider()
  return new CreateUser(userRepository, hashProvider, uniqueIdGenerator)
}

export const makeGetUserById = () => {
  const userRepository = new UserRepository()
  return new GetUserById(userRepository)
}
