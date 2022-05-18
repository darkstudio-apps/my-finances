export type ITransactionRequestQueryAction = "current" | "next" | "all"

export interface ITransactionRequestBase {
  idUser: string
  title: string
  amount: number
  date: string
  status: string
  typeRecurrence: string
  installments: string
  type: ITransactionPropType
  isRecurrence: boolean
}

export type ITransactionRequestPost = ITransactionRequestBase

export interface ITransactionRequestPut {
  id: string
  transaction: ITransactionRequestBase
  action?: ITransactionRequestQueryAction
}

export interface ITransactionRequestDelete {
  id: string
  action?: ITransactionRequestQueryAction
}
