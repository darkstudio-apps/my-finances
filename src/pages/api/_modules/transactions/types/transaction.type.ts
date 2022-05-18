import { ITransactionServicePost } from "./transactionService.type"

export type ITransactionTypeProp = "deposit" | "withdraw"

// TODO: usar Enum  - https://www.typescriptlang.org/docs/handbook/enums.html
export type ITransactionTypeRecurrence = ""
  | "every_1_week"
  | "every_15_days"
  | "monthly"
  | "yearly"
  | "installments"

export interface ITransaction {
  id: string
  idUser: string
  title: string
  amount: number
  date: string
  status: string
  idRecurrence: string
  typeRecurrence: string
  isRecurrence: boolean
  installments: string
  type: ITransactionTypeProp
}

export interface ITransactionPost extends ITransactionServicePost {
  isRecurrence: boolean
  idRecurrence: string
}

export type ITransactionPut = Partial<ITransaction>

export type ITransactionPutMany = Partial<ITransaction>

export type ITransactionPatch = Partial<ITransaction>

export type ITransactionRemove = string

export type ITransactionRemoveMany = string[]
