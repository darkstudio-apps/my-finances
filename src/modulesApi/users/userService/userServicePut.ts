import { userRepositoryUpdateOne } from "../userRepository"
import { IUserPut } from "../types/user.type"
import { IUserResponsePut } from "../types/userResponse.type"

export async function userServicePut(
  id: string,
  transaction: IUserPut
): Promise<IUserResponsePut> {
  try {
    const isModified = await userRepositoryUpdateOne(id, transaction)

    const response: IUserResponsePut = {
      isModified,
    }

    return response
  } catch (error) {
    throw error
  }
}
