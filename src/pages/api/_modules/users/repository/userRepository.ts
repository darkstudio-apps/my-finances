import { ObjectId } from "mongodb"
import { connectToDatabase } from "libs/mongodb"
import { IUser, IUserPost, IUserPut } from "../types/user.type"

async function get(email: string): Promise<IUser | null> {
  try {
    const { db } = await connectToDatabase()

    const user = await db
      .collection<IUser>("User")
      .findOne({
        email,
    },
      })

    if (!user) return null

    const mappedUser: IUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    }

    return mappedUser
  } catch (error) {
    throw error
  }
}

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
