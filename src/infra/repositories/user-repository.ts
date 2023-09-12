import { Prisma } from '@prisma/client'
import { prisma } from '@/config/prisma'

export class UserRepository {
  async createUser(params: UserRepository.CreateUserParams) {
    return prisma.user.create({
      data: params
    })
  }

  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    return user
  }

  async getUserById(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    return user
  }
}

export namespace UserRepository {
  export type CreateUserParams = Prisma.UserUncheckedCreateInput
}
