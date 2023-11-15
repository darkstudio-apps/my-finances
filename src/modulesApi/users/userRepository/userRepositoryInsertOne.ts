import { connectToDatabase } from "libs/mongodb"
import { IUserPost } from "../types/user.type"

export async function userRepositoryInsertOne(user: IUserPost): Promise<string> {
  try {
    const { db } = await connectToDatabase()

    const createdAt = new Date().toISOString()

    const userToInsert: IUserPost = {
      ...user,
      createdAt,
    }

    const { insertedId } = await db
      .collection<IUserPost>("User")
      .insertOne(userToInsert)

    const insertedUserId = insertedId.toString()

    return insertedUserId
  } catch (error) {
    throw error
  }
}
