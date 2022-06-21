import { IUser } from "./user.type"

export interface IUserResponseGet {
  user: IUser | null
}

export interface IUserResponsePost {
  insertedUserId: string
}

export interface IUserResponseUpsert {
  user?: IUser
  insertedUserId?: string
}

export interface IUserResponsePut {
  user: IUser
}

export interface IUserResponseRemove {
  success: boolean
}
