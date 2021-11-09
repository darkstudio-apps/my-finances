import { TransactionModelProps, TransactionReqProps } from "../../../../../hooks/useTransactions/transaction.types"
import { transactionRepository } from "../repository/transactionRepository"

function list() {
  const transactions = transactionRepository.list()
  return transactions
}

function get(id: string) {
  const transaction = transactionRepository.get(id)
  return transaction
}

function post(transaction: TransactionModelProps) {
  const createdTransaction = transactionRepository.post(transaction)
  return createdTransaction
}

function put(id: string, transaction: Partial<TransactionReqProps>) {
  const editedTransaction = transactionRepository.put(id, transaction)
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
