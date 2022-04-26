import { IUser } from "./user.type"
export type IUserResponseGet = IUser
export type IUserResponsePost = IUser
export type IUserResponseUpsert = IUser
export type IUserResponsePut = IUser
export type IUserResponseRemove = {
  success: boolean
}
