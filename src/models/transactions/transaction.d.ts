import { ITransactionResponse } from "./transaction.response"

export type ITransactionPropType = "deposit" | "withdraw"

// TODO: Usar Enum
export type ITransactionPropRecurrence = ""
  | "every_1_week"
  | "every_15_days"
  | "monthly"
  | "yearly"
  | "installments"

export interface ITransaction extends ITransactionResponse {
  dateDisplay: string
  amountDisplay: string
  statusDisplay: string
}

export interface ITransactionState {
  title: string
  amount: string
  date: string
  status: string
  typeRecurrence: string
  installments: string
  type: ITransactionPropType | null
}

export interface ITransactionGetFilters {
  month: string
  year: string
}
