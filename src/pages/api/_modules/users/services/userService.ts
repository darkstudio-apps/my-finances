import { userRepository } from "../repository/userRepository"
import { IUserPost, IUserPut } from "../types/user.type"
import { IUserResponseGet, IUserResponsePost, IUserResponsePut, IUserResponseRemove } from "../types/userResponse.type"

async function get(email: string): Promise<IUserResponseGet> {
  const user = await userRepository.get(email)

  const response: IUserResponseGet = {
    user,
  }

  return response
}

async function post(user: IUserPost): Promise<IUserResponsePost> {
  const createdUser = await userRepository.post(user)

  const response: IUserResponsePost = {
    user: createdUser,
  }

  return response
}

async function put(id: string, transaction: IUserPut): Promise<IUserResponsePut> {
  const editedUser = await userRepository.put(id, transaction)

  const response: IUserResponsePut = {
    user: editedUser,
  }
  return response
}

async function remove(id: string): Promise<IUserResponseRemove> {
  const ok = await userRepository.remove(id)

  const response: IUserResponseRemove = {
    success: !!ok,
  }
  return response
}

export const userService = {
  get,
  post,
  put,
  remove,
}
