import { PrismaClient } from "@prisma/client"
import { UserReqProps } from "../../../../../hooks/useUsers/user.types"
import { IUserPost } from "../types/user.type"
import { IUserResponseGet, IUserResponsePost, IUserResponsePut, IUserResponseRemove, IUserResponseUpsert } from "../types/userResponse.type"

type PartialUser = Partial<UserReqProps>

const prisma = new PrismaClient()

// TODO: um usuario nunca pode conseguir ter acesso à informações de outros usuarios
// O mesmo para as outras ações, o user só pode editar ele mesmo
async function get(email: string): Promise<IUserResponseGet> {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  })
  return user as IUserResponseGet
}

async function post(user: IUserPost): Promise<IUserResponsePost> {
  const newUser = await prisma.user.create({
    data: user,
  })

  return newUser
}

async function upsert(user: IUserPost): Promise<IUserResponseUpsert> {
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

async function put(idUser: string, User: PartialUser): Promise<IUserResponsePut> {
  const editedUser = await prisma.user.update({
    where: { id: idUser },
    data: User,
  })

  return editedUser
}

async function remove(idUser: string): Promise<IUserResponseRemove> {
  const user = await prisma.user.delete({
    where: { id: idUser },
  })

  return {
    success: !!user,
  }
}

export const userRepository = {
  get,
  post,
  upsert,
  put,
  remove,
}
