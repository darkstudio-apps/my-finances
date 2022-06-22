import { ObjectId } from "mongodb"
import { connectToDatabase } from "libs/mongodb"
import { IUserPut } from "../types/user.type"

export async function userRepositoryUpdateOne(
  idUser: string,
  user: IUserPut
): Promise<boolean> {
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
