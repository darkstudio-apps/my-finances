import {
  transactionRepositoryInsertMany,
  transactionRepositoryInsertOne,
} from "../transactionRepository"
import { generateTransaction, generateTransactionsRecurrence } from "./utils"
import { ITransactionServicePost } from "../types/transactionService.type"

export async function transactionServicePost(idUser: string, transaction: ITransactionServicePost) {
  // TODO: validate schema

  const objTransaction = generateTransaction(transaction)

  if (!objTransaction.isRecurrence) {
    const createdTransaction = await transactionRepositoryInsertOne(idUser, objTransaction)

    const createdTransactionData = {
      createdTransaction,
    }

    return createdTransactionData
  }
  else {
    const transactions = generateTransactionsRecurrence(objTransaction)

    const createdTransactions = await transactionRepositoryInsertMany(idUser, transactions)

    const createdTransactionsData = {
      createdTransactions,
    }

    return createdTransactionsData
  }

  // TODO: retornar um obj com a tipagem de transactionResponse
  // TODO: ter um unico retorno
}
