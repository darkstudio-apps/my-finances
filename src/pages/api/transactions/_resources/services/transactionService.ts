import { TransactionModelProps, TransactionReqProps } from "../../../../../hooks/useTransactions/transaction.types"
import { transactionRepository } from "../repository/transactionRepository"

async function list(idUser: string) {
  const transactions = await transactionRepository.list(idUser)
  return transactions
}

async function get(id: string) {
  const transaction = await transactionRepository.get(id)
  return transaction
}

async function post(transaction: TransactionModelProps) {
  const createdTransaction = await transactionRepository.post(transaction)
  return createdTransaction
}

async function put(id: string, transaction: Partial<TransactionReqProps>) {
  const editedTransaction = await transactionRepository.put(id, transaction)
  return editedTransaction
}

function patch(id: string, transaction: Partial<TransactionReqProps>) {
  const editedTransaction = transactionRepository.put(id, transaction)
  return editedTransaction
}

function remove(id: string) {
  const ok = transactionRepository.remove(id)
  return ok
}

export const transactionService = {
  list,
  get,
  post,
  put,
  patch,
  remove,
}
