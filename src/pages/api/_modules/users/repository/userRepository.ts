import { PrismaClient } from "@prisma/client"
import { UserModelProps, UserReqProps } from "../../../../../hooks/useUsers/user.types"

type PartialUser = Partial<UserReqProps>

const prisma = new PrismaClient()

async function list() {
  const user = await prisma.user.findMany()
  return user
}

async function get(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
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

async function upsert(user: UserModelProps) {
  const { name, email } = user

  const getUser = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (getUser) return getUser

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
    },
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
  upsert,
  put,
  patch,
  remove,
}