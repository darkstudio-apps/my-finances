
import { uuid } from "../../../../../../utils/generateID"
import { generateDatesRecurrence } from "./"
import {
  ITransaction,
  ITransactionPartial,
  ITransactionForCreate,
  ITransactionForRegister,
  ITransactionTypeRecurrenceProp,
} from "../../types/transaction.type"

export const generateTransaction = (transaction: ITransactionForRegister): ITransactionForCreate => {
  const isRecurrence = transaction.typeRecurrence !== ""
  const idRecurrence = uuid()

  const mappedTransaction: ITransactionForCreate = {
    ...transaction,
    isRecurrence,
    idRecurrence,
  }

  return mappedTransaction
}

export const generateTransactionToPost = (currentTransaction: ITransaction, transaction: ITransactionPartial): ITransactionForRegister => {
  const typeRecurrence = transaction.typeRecurrence ?? currentTransaction.typeRecurrence

  const transactionToPost: ITransactionForRegister = {
    idUser: transaction.idUser || currentTransaction.idUser,
    title: transaction.title || currentTransaction.title,
    amount: transaction.amount || currentTransaction.amount,
    date: transaction.date || currentTransaction.date,
    status: transaction.status ?? currentTransaction.status,
    typeRecurrence: typeRecurrence as ITransactionTypeRecurrenceProp,
    installments: transaction.installments ?? currentTransaction.installments,
    type: transaction.type || currentTransaction.type,
  }

  return transactionToPost
}

export const generateTransactionsRecurrence = (transaction: ITransactionForCreate): ITransactionForCreate[] => {
  const typeRecurrence = transaction.typeRecurrence as ITransactionTypeRecurrenceProp
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
