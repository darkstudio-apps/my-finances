import { ITransactionServicePost, ITransaction } from "./transaction.type"

export interface ITransactionRequestSession {
  user?: {
    name?: string
    email?: string
    image?: string
    idUser?: string
  }
  expires?: string
}

export type ITransactionRequestActionParam = "current" | "next" | "all"

export interface ITransactionRequest {
  query: {
    idUser: string
    id: string
    action?: ITransactionRequestActionParam
  }
  body: Partial<ITransaction>
}

export interface ITransactionRequestRoot {
  query: {
    idUser: string
    month?: string
    year?: string
  }
  body: ITransactionServicePost
}
