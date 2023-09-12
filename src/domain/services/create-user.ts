import { UserAlreadyExistsError } from '@/domain/errors'
import { UserRepository } from '@/infra/repositories'
import { HashProvider, UniqueIdProvider } from '@/infra/providers'

export class CreateUser {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _hashProvider: HashProvider,
    private readonly _uniqueIdGenerator: UniqueIdProvider
  ) {}

  async execute(params: CreateUser.Params) {
    const existingUser = await this._userRepository.getUserByEmail(params.email)

    if (existingUser) {
      throw new UserAlreadyExistsError()
    }

    const hashedPassword = await this._hashProvider.createHash(params.password)

    const userCreated = await this._userRepository.createUser({
      publicId: this._uniqueIdGenerator.generateUniqueId(),
      firstName: params.firstName,
      lastName: params.lastName,
      avatar: params.avatar,
      email: params.email,
      password: hashedPassword
    })

    return userCreated
  }
}

export namespace CreateUser {
  export type Params = {
    firstName: string
    lastName: string
    avatar: string
    email: string
    password: string
  }
}
