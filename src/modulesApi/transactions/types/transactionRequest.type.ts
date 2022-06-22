import { ITransaction } from "./transaction.type"
import { ITransactionServicePost } from "./transactionService.type"

export interface ITransactionRequestSession {
  user?: {
    name?: string
    email?: string
    image?: string
    idUser?: string
  }
  expires?: string
}

export type ITransactionRequestQueryActionParam = "current" | "next" | "all"

export interface ITransactionRequest {
  query: {
    idUser: string
    id: string
    action?: ITransactionRequestQueryActionParam
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
