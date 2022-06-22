import { connectToDatabase } from "libs/mongodb"
import { IUserPost } from "../types/user.type"

export async function userRepositoryInsertOne(user: IUserPost): Promise<string> {
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
