import { UserNotFoundError } from '@/domain/errors'
import { UserRepository } from '@/infra/repositories'

export class GetUserById {
  constructor(private readonly _userRepository: UserRepository) {}

  async execute(id: number) {
    const user = await this._userRepository.getUserById(id)

    if (!user) {
      throw new UserNotFoundError()
    }

    return user
  }
}
