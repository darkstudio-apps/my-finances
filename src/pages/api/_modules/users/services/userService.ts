import { userRepository } from "../repository/userRepository"
import { UserModelProps, UserReqProps } from "../../../../../hooks/useUsers/user.types"

async function get(email: string) {
  const user = await userRepository.get(email)
  return user
}

async function post(user: UserModelProps) {
  const createdUser = await userRepository.post(user)
  return createdUser
}

async function put(id: string, transaction: Partial<UserReqProps>) {
  const editedUser = await userRepository.put(id, transaction)
  return editedUser
}

function patch(id: string, transaction: Partial<UserReqProps>) {
  const editedUser = userRepository.put(id, transaction)
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
  patch,
  remove,
}
