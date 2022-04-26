import { PrismaClient } from "@prisma/client"
import { UserReqProps } from "../../../../../hooks/useUsers/user.types"
import { IUserPost } from "../types/user.type"
import { IUserResponseGet, IUserResponsePost, IUserResponsePut, IUserResponseRemove, IUserResponseUpsert } from "../types/userResponse.type"

type PartialUser = Partial<UserReqProps>

const prisma = new PrismaClient()

// TODO: um usuario nunca pode conseguir ter acesso à informações de outros usuarios
// O mesmo para as outras ações, o user só pode editar ele mesmo
async function get(email: string): Promise<IUserResponseGet> {
  const user: any = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  const response: IUserResponseGet = {
    user,
  }

  return response
}

async function post(user: IUserPost): Promise<IUserResponsePost> {
  const newUser = await prisma.user.create({
    data: user,
  })

  const response: IUserResponsePost = {
    user: newUser,
  }

  return response
}

async function upsert(user: IUserPost): Promise<IUserResponseUpsert> {
  const { name, email } = user

  const getUser: any = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (getUser) {
    const response: IUserResponseUpsert = {
      user: getUser,
    }

    return response
  }

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
    },
  })

  const responseCreate: IUserResponseUpsert = {
    user: newUser,
  }

  return responseCreate
}

async function put(idUser: string, User: PartialUser): Promise<IUserResponsePut> {
  const editedUser = await prisma.user.update({
    where: { id: idUser },
    data: User,
  })

  const response: IUserResponsePut = {
    user: editedUser,
  }

  return response
}

async function remove(idUser: string): Promise<IUserResponseRemove> {
  const user: any = await prisma.user.delete({
    where: { id: idUser },
  })

  const response: IUserResponseRemove = {
    success: !!user,
  }

  return response

}

export const userRepository = {
  get,
  post,
  upsert,
  put,
  remove,
}
