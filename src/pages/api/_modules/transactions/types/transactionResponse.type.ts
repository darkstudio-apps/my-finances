import { ITransaction } from "./transaction.type"

export interface ITransactionGetAllResponse {
  search: {
    dateStart: string
    dateEnd: string
  }
  length: number
  data: ITransaction[]
}
