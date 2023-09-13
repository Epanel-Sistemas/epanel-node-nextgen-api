import { InvalidPasswordError, UserNotFoundError } from '@/domain/errors'
import { UserRepository } from '@/infra/repositories'
import { HashProvider, JwtProvider } from '@/infra/providers'
import env from '@/config/env'

type Params = {
  email: string
  password: string
}

export class Authenticate {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _hashProvider: HashProvider,
    private readonly _jwtProvider: JwtProvider
  ) {}

  async execute(params: Params) {
    const user = await this._userRepository.getUserByEmail(params.email)

    if (user) {
      const isValid = await this._hashProvider.compareHash(
        params.password,
        user.password
      )

      if (!isValid) {
        throw new InvalidPasswordError()
      }

      const token = await this._jwtProvider.encryptToken(
        user.id.toString(),
        env.jwtSecret
      )

      return Object.assign(user, { token })
    } else {
      throw new UserNotFoundError()
    }
  }
}
