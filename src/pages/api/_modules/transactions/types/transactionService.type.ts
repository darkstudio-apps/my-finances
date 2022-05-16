import { ITransactionPatch, ITransactionPut, ITransactionTypeProp, ITransactionTypeRecurrence } from "./transaction.type"
import { ITransactionRequestQueryActionParam } from "./transactionRequest.type"

export interface ITransactionServiceList {
  idUser: string
  month?: string
  year?: string
}

export interface ITransactionServicePost {
  idUser: string
  title: string
  amount: number
  date: string
  status: string
  typeRecurrence: ITransactionTypeRecurrence
  installments: string
  type: ITransactionTypeProp
}

export interface ITransactionServicePut {
  idUser: string
  id: string
  // TODO: modificar a tipagem para obrigar o envio de todos os dados, algumas regras dependem de certos dados
  transaction: ITransactionPut
  action?: ITransactionRequestQueryActionParam
}

export interface ITransactionServicePatch {
  id: string
  transaction: ITransactionPatch
}

export interface ITransactionServiceRemove {
  idUser: string
  id: string
  action?: ITransactionRequestQueryActionParam
}
