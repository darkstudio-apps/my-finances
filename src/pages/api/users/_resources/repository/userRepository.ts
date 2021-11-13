import { UserModelProps, UserReqProps } from "../../../../../hooks/useUsers/user.types"
import { PrismaClient } from "@prisma/client"

type PartialUser = Partial<UserReqProps>

const prisma = new PrismaClient()

async function list() {
  const user = await prisma.user.findMany()
  return user
}

async function get(idUser: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: idUser,
    },
  })

  return user
}

async function post(user: UserModelProps) {
  const newUser = await prisma.user.create({
    data: user,
  })

  return newUser
}

async function put(idUser: string, User: PartialUser) {
  const editedUser = await prisma.user.update({
    where: { id: idUser },
    data: User,
  })

  return editedUser
}

function patch(idUser: string, user: PartialUser) {
  const obj = {
    ...user,
    id: idUser,
  }

  return obj
}

async function remove(idUser: string): Promise<boolean> {
  const user = await prisma.user.delete({
    where: { id: idUser },
  })

  return !!user
}

export const userRepository = {
  list,
  get,
  post,
  put,
  patch,
  remove,
}
