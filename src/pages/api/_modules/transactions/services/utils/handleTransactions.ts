
import { uuid } from "utils/generateID"
import { generateDatesRecurrence } from "./"
import {
  ITransaction,
  ITransactionPost,
  ITransactionPut,
  ITransactionTypeRecurrence,
} from "../../types/transaction.type"
import { ITransactionServicePost } from "../../types/transactionService.type"

export const generateTransaction = (transaction: ITransactionServicePost): ITransactionPost => {
  const isRecurrence = transaction.typeRecurrence !== ""
  const idRecurrence = uuid()

  const mappedTransaction: ITransactionPost = {
    ...transaction,
    isRecurrence,
    idRecurrence,
  }

  return mappedTransaction
}

// TODO; alterar o nome para generateTransactionToRegister
export const generateTransactionToPost = (currentTransaction: ITransaction, transaction: ITransactionPut): ITransactionServicePost => {
  const typeRecurrence = transaction.typeRecurrence ?? currentTransaction.typeRecurrence

  const transactionToPost: ITransactionServicePost = {
    idUser: transaction.idUser || currentTransaction.idUser,
    title: transaction.title || currentTransaction.title,
    amount: transaction.amount || currentTransaction.amount,
    date: transaction.date || currentTransaction.date,
    status: transaction.status ?? currentTransaction.status,
    typeRecurrence: typeRecurrence as ITransactionTypeRecurrence,
    installments: transaction.installments ?? currentTransaction.installments,
    type: transaction.type || currentTransaction.type,
  }

  return transactionToPost
}

export const generateTransactionToCreate = (currentTransaction: ITransaction, transaction: ITransactionPut): ITransactionPost => {
  const typeRecurrence = transaction.typeRecurrence ?? currentTransaction.typeRecurrence

  const transactionToCreate: ITransactionPost = {
    idUser: transaction.idUser || currentTransaction.idUser,
    title: transaction.title || currentTransaction.title,
    amount: transaction.amount || currentTransaction.amount,
    date: transaction.date || currentTransaction.date,
    status: transaction.status ?? currentTransaction.status,
    typeRecurrence: typeRecurrence as ITransactionTypeRecurrence,
    installments: transaction.installments ?? currentTransaction.installments,
    type: transaction.type || currentTransaction.type,
    idRecurrence: transaction.idRecurrence || currentTransaction.idRecurrence,
    isRecurrence: transaction.isRecurrence || currentTransaction.isRecurrence,
  }

  return transactionToCreate
}

export const generateTransactionsRecurrence = (transaction: ITransactionPost): ITransactionPost[] => {
  const typeRecurrence = transaction.typeRecurrence as ITransactionTypeRecurrence
  if (typeRecurrence === "") return []

  const datesRecurrence = generateDatesRecurrence[typeRecurrence](transaction)

  const transactionsRecurrence = datesRecurrence.map((dateFuture, idx) => {
    const isValidStatus = transaction.status === "deposit" || transaction.status === "withdraw"

    const status = (isValidStatus || idx === 0) ? transaction.status : ""

    return {
      ...transaction,
      date: dateFuture,
      status,
    }
  })

  return transactionsRecurrence
}

const handleTransactions = {
  generateTransactionsRecurrence,
}

export default handleTransactions
