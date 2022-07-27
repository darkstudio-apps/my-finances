import { userServiceGet, userServicePost } from "./"
import { IUserPost } from "../types/user.type"
import { IUserResponseUpsert } from "../types/userResponse.type"

export async function userServiceUpsert(
  userToUpsert: IUserPost
): Promise<IUserResponseUpsert> {
  try {
    const { email } = userToUpsert

    const { user } = await userServiceGet(email)

    if (user) return { user }

    const { insertedUserId } = await userServicePost(userToUpsert)

    return { insertedUserId }
  } catch (error) {
    throw error
  }
}
