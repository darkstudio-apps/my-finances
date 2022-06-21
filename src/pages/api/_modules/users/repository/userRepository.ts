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

async function post(user: IUserPost): Promise<string> {
  try {
    const { db } = await connectToDatabase()

    const { insertedId } = await db
      .collection<IUserPost>("User")
      .insertOne(user)

    const insertedUserId = insertedId.toString()

    return insertedUserId
  } catch (error) {
    throw error
  }
}

async function put(idUser: string, user: IUserPut): Promise<boolean> {
  try {
    const { db } = await connectToDatabase()

    const { modifiedCount } = await db
      .collection<IUserPut>("User")
      .updateOne(
        {
          _id: new ObjectId(idUser),
        },
        user,
      )

    const isModified = modifiedCount > 0

    return isModified
  } catch (error) {
    throw error
  }
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
  put,
  remove,
}
