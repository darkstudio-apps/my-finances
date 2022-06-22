import { userRepositoryFindOne } from "../userRepository"
import { IUserResponseGet } from "../types/userResponse.type"

export async function userServiceGet(email: string): Promise<IUserResponseGet> {
  try {
    const user = await userRepositoryFindOne(email)

    const response: IUserResponseGet = {
      user,
    }

    return response
  } catch (error) {
    throw error
  }
}
