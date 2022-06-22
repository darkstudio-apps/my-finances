import { ObjectId } from "mongodb"
import { connectToDatabase } from "libs/mongodb"
import { IUser } from "../types/user.type"

export async function userRepositoryDeleteOne(idUser: string): Promise<boolean> {
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
