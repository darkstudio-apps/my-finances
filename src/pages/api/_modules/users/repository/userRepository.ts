import { PrismaClient } from "@prisma/client"
import { IUser, IUserPost, IUserPut } from "../types/user.type"

const prisma = new PrismaClient()

// TODO: um usuario nunca pode conseguir ter acesso à informações de outros usuarios
// O mesmo para as outras ações, o user só pode editar ele mesmo
async function get(email: string): Promise<IUser> {
  const user: any = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  return user as IUser
}

async function post(user: IUserPost): Promise<IUser> {
  const newUser = await prisma.user.create({
    data: user,
  })

  return newUser as IUser
}

async function upsert(user: IUserPost): Promise<IUser> {
  const { name, email } = user

  const getUser: any = await prisma.user.findFirst({
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

  return newUser as IUser
}

async function put(idUser: string, User: IUserPut): Promise<IUser> {
  const editedUser = await prisma.user.update({
    where: { id: idUser },
    data: User,
  })

  return editedUser as IUser
}

async function remove(idUser: string): Promise<IUser> {
  const user: any = await prisma.user.delete({
    where: { id: idUser },
  })

  return user as IUser
}

export const userRepository = {
  get,
  post,
  upsert,
  put,
  remove,
}
