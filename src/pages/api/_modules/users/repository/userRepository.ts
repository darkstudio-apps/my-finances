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

async function remove(idUser: string): Promise<boolean> {
  try {
    const { db } = await connectToDatabase()

    const { deletedCount } = await db
      .collection<IUser>("User")
      .deleteOne({
        _id: new ObjectId(idUser),
      })

    const isDeleted = deletedCount > 0

    return isDeleted
  } catch (error) {
    throw error
  }
}

export const userRepository = {
  get,
  post,
  put,
  remove,
}
