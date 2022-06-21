import { userRepository } from "../repository/userRepository"
import { IUserPost, IUserPut } from "../types/user.type"
import {
  IUserResponseGet,
  IUserResponsePost,
  IUserResponsePut,
  IUserResponseRemove,
  IUserResponseUpsert,
} from "../types/userResponse.type"

async function get(email: string): Promise<IUserResponseGet> {
  try {
    const user = await userRepository.get(email)

    const response: IUserResponseGet = {
      user,
    }

    return response
  } catch (error) {
    throw error
  }
}

async function post(user: IUserPost): Promise<IUserResponsePost> {
  try {
    const insertedUserId = await userRepository.post(user)

    const response: IUserResponsePost = {
      insertedUserId,
    }

    return response
  } catch (error) {
    throw error
  }
}

async function upsert(userToUpsert: IUserPost): Promise<IUserResponseUpsert> {
  try {
    const { email } = userToUpsert

    const { user } = await get(email)

    if (user) return { user }

    const { insertedUserId } = await post(userToUpsert)

    return { insertedUserId }
  } catch (error) {
    throw error
  }
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
