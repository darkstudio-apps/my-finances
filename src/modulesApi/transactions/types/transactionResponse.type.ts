import { ITransaction } from "./transaction.type"

export interface ITransactionListResponse {
  search: {
    dateStart: string
    dateEnd: string
  }
  length: number
  data: ITransaction[]
}

export interface ITransactionErrorResponse {
  status: number
  message: string
}
