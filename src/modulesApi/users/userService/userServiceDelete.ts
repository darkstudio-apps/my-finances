import { userRepositoryDeleteOne } from "../userRepository"
import { IUserResponseRemove } from "../types/userResponse.type"

export async function userServiceDelete(id: string): Promise<IUserResponseRemove> {
  try {
    const isDeleted = await userRepositoryDeleteOne(id)

    const response: IUserResponseRemove = {
      isDeleted,
    }

    return response
  } catch (error) {
    throw error
  }
}
