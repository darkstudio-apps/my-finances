import { connectToDatabase } from "libs/mongodb"
import { IUser } from "../types/user.type"

export async function userRepositoryFindOne(email: string): Promise<IUser | null> {
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
