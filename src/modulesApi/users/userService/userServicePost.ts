import { userRepositoryInsertOne } from "../userRepository"
import { IUserPost } from "../types/user.type"
import { IUserResponsePost } from "../types/userResponse.type"

export async function userServicePost(user: IUserPost): Promise<IUserResponsePost> {
  try {
    const insertedUserId = await userRepositoryInsertOne(user)

    const response: IUserResponsePost = {
      insertedUserId,
    }

    return response
  } catch (error) {
    throw error
  }
}
