import { userRepository } from "../repository/userRepository"
import { IUserPost, IUserPut } from "../types/user.type"

async function get(email: string) {
  const user = await userRepository.get(email)
  return user
}

async function post(user: IUserPost) {
  const createdUser = await userRepository.post(user)
  return createdUser
}

async function put(id: string, transaction: IUserPut) {
  const editedUser = await userRepository.put(id, transaction)
  return editedUser
}

function remove(id: string) {
  const ok = userRepository.remove(id)
  return ok
}

export const userService = {
  get,
  post,
  put,
  remove,
}
