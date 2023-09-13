import { Authenticate } from '@/domain/services'
import { UserNotFoundError, InvalidPasswordError } from '@/domain/errors'
import { HashProvider } from '@/infra/providers/hash-provider'
import { JwtProvider } from '@/infra/providers/jwt-provider'
import { UserRepository } from '@/infra/repositories'

import { MockedUser } from './mocks/user'

const makeSut = () => {
  const mockedUserRepository = {
    getUserByEmail: jest.fn()
  } as any as jest.Mocked<UserRepository>

  const mockedHashProvider = {
    compareHash: jest.fn()
  } as any as jest.Mocked<HashProvider>

  const mockedJwtProvider = {
    encryptToken: jest.fn()
  } as any as jest.Mocked<JwtProvider>

  const sut = new Authenticate(
    mockedUserRepository,
    mockedHashProvider,
    mockedJwtProvider
  )

  return { sut, mockedUserRepository, mockedHashProvider, mockedJwtProvider }
}

describe('Authenticate', () => {
  it('should throw UserNotFoundError if user is not found', async () => {
    const { sut, mockedUserRepository } = makeSut()
    mockedUserRepository.getUserByEmail.mockResolvedValueOnce(undefined)
    const promise = sut.execute({
      email: 'any_email',
      password: 'any_password'
    })
    await expect(promise).rejects.toThrow(new UserNotFoundError())
  })

  it('should throw InvalidPasswordError if password is invalid', async () => {
    const { sut, mockedUserRepository, mockedHashProvider } = makeSut()
    mockedUserRepository.getUserByEmail.mockResolvedValueOnce(MockedUser)
    mockedHashProvider.compareHash.mockResolvedValueOnce(false)

    const promise = sut.execute({
      email: 'any_email',
      password: 'any_password'
    })

    await expect(promise).rejects.toThrow(new InvalidPasswordError())
  })

  it('should return a token if user is authenticated', async () => {
    const { sut, mockedUserRepository, mockedHashProvider, mockedJwtProvider } =
      makeSut()
    mockedUserRepository.getUserByEmail.mockResolvedValueOnce(MockedUser)
    mockedHashProvider.compareHash.mockResolvedValueOnce(true)
    mockedJwtProvider.encryptToken.mockReturnValueOnce('any_token')

    const result = await sut.execute({
      email: 'any_email',
      password: 'any_password'
    })

    expect(result).toBeDefined()
    expect(result.token).toBe('any_token')
    expect(result.id).toBeDefined()
  })
})
