import { TransactionModelProps, TransactionReqProps } from "../../../../../hooks/useTransactions/transaction.types"
import { getObjYearMonthDay, parseToUTCandISO } from "../../../../../utils/dateUtil"
import { transactionRepository } from "../repository/transactionRepository"
import { TransactionModelCreateProps } from "../types/transactionRequests.type"

async function list(idUser: string, month: string, year: string) {
  const dateNow = getObjYearMonthDay()

  const dateMonth = month ? month : dateNow.month
  const dateYear = year ? year : dateNow.year

  const dateStart = `${dateYear}-${dateMonth}-01`
  const dateEnd = `${dateYear}-${dateMonth}-31`

  const dateStartISO = parseToUTCandISO(dateStart, "start")
  const dateEndISO = parseToUTCandISO(dateEnd, "end")

  const transactions = await transactionRepository.list({ idUser, dateStartISO, dateEndISO })

  // map -> editar as transactions

  return transactions
}

async function get(id: string) {
  const transaction = await transactionRepository.get(id)
  return transaction
}

async function post(transaction: TransactionModelProps) {
  const mappedTransaction: TransactionModelCreateProps = {
    ...transaction,
    idRecurrence: "1onre0819mf0983n",
  }

  const createdTransaction = await transactionRepository.post(mappedTransaction)
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
