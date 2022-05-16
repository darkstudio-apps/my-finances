export interface IUser {
  id: string
  name: string
  email: string
}

export interface IUserPost {
  name: string
  email: string
}

export interface IUserPut {
  name?: string
  email?: string
}
