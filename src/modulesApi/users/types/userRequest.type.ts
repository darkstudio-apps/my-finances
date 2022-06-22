import { IUserPost, IUserPut } from "./user.type"

export interface IUserRequestGet {
  query: {
    id: string
  }
}

export interface IUserRequestPost {
  body: IUserPost
}

export interface IUserRequestPut {
  query: {
    id: string
  }
  body: Partial<IUserPut>
}

export interface IUserRequestRemove {
  query: {
    id: string
  }
}
