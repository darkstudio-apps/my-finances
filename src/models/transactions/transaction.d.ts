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

export interface ITransactionFormState {
  title: string
  amount: string
  date: string
  status: string
  typeRecurrence: string
  installments: string
  type: ITransactionPropType | null
}

export interface IModalTransactionForm {
  isOpen: boolean
  editMode: boolean
  dataToEdit: ITransaction | null
}

export interface ITransactionSummary {
  deposit: string
  withdraw: string
  total: string
}

export interface ITransactionGetFilters {
  month: string
  year: string
}

export interface ITransactionModalRecurrenceEditState {
  isOpen: boolean
  idTransaction: string | null
  transaction: ITransactionRequestBase | null
}

export interface ITransactionModalDeleteState {
  isOpenModal: boolean
  isOpenModalRecurrence: boolean
  idTransaction: string | null
  isRecurrence: boolean
}
