import { transactionRepository } from "../repository/transactionRepository"

import { generateTransaction, generateTransactionsRecurrence, generateTransactionToPost } from "./utils"
import { dateNowYearMonthDay, endOfMonthInYearMonthDay, generateDecimalNumberInString, getObjYearMonthDay, parseToUTCandISO } from "../../../../../utils/dateUtil"

import { ITransaction, ITransactionForRegister, ITransactionPartial } from "../types/transaction.type"
import { ITransactionRequestActionParam } from "../types/transactionRequest.type"

async function list(idUser: string, month?: string, year?: string) {
  const dateYearMonthDay = dateNowYearMonthDay()
  const dateNow = getObjYearMonthDay(dateYearMonthDay)

  const dateMonthNumber = Number(month ? month : dateNow.month)
  const dateMonth = generateDecimalNumberInString(dateMonthNumber)
  const dateYear = year ? year : dateNow.year

  const dateStart = `${dateYear}-${dateMonth}-01`
  const dateEnd = endOfMonthInYearMonthDay(dateStart)

  const dateStartISO = parseToUTCandISO(dateStart, "start")
  const dateEndISO = parseToUTCandISO(dateEnd, "end")

  const transactionsData = await transactionRepository.list({ idUser, dateStartISO, dateEndISO })

  return transactionsData
}

async function get(id: string) {
  const transaction = await transactionRepository.get(id)

  // TODO: retornar um obj com a tipagem de transactionResponse

  return transaction
}

async function post(transaction: ITransactionForRegister) {
  const objTransaction = generateTransaction(transaction)

  if (!objTransaction.isRecurrence) {
    const createdTransaction = await transactionRepository.post(objTransaction)
    return createdTransaction
  }
  else {
    const transactions = generateTransactionsRecurrence(objTransaction)

    const createdTransactions = await transactionRepository.postMany(transactions)
    return createdTransactions
  }

  // TODO: retornar um obj com a tipagem de transactionResponse
  // TODO: ter um unico retorno
}

// TODO: [ ] Editar uma transação que é uma recorrência, pra não ser mais uma recorrência.

interface IPut {
  idUser: string
  id: string
  transaction: ITransactionPartial
  action?: ITransactionRequestActionParam
}

async function put({ idUser, id, transaction, action }: IPut) {
  const currentTransaction = await transactionRepository.get(id)

  if (!currentTransaction) throw new Error("transaction not found")

  if (currentTransaction?.typeRecurrence === "" && transaction.typeRecurrence !== "") {
    const transactionToPost = generateTransactionToPost(currentTransaction, transaction)

    post(transactionToPost)
    remove({ idUser, id })

    return true
  }

  // TODO: quando mudar o typeRecurrence ou o installments

  // TODO: [ ] Editar a data de uma transação que é uma recorrência, e refletir para as próximas transações levando em consideração o mês.
  // const currentTransactions = await transactionRepository.list({ idUser, idRecurrence })

  if (transaction.isRecurrence && action && action !== "current") {
    const idRecurrence = transaction.idRecurrence || ""

    const transactionMapped: ITransactionPartial = {
      title: transaction.title || currentTransaction.title,
      amount: transaction.amount || currentTransaction.amount,
      status: transaction.status || currentTransaction.status,
      type: transaction.type || currentTransaction.type,
    }

    const editedTransactions = await transactionRepository.putMany(idRecurrence, transactionMapped)

    return editedTransactions
  }

  const editedTransaction = await transactionRepository.put(id, transaction)

  // TODO: retornar um obj com a tipagem de transactionResponse

  return editedTransaction
}

async function patch(id: string, transaction: ITransactionPartial) {
  const editedTransaction = await transactionRepository.put(id, transaction)

  // TODO: retornar um obj com a tipagem de transactionResponse

  return editedTransaction
}

interface IRemove {
  idUser: string
  id: string
  action?: ITransactionRequestActionParam
}

const generateFiltersListRemove = (transaction: ITransaction, action?: ITransactionRequestActionParam) => {
  const { id, idUser, idRecurrence, date } = transaction

  const dateStartISO = date

  if (action === "all") return { idUser, idRecurrence }

  if (action === "next") return { idUser, idRecurrence, dateStartISO }

  return { idUser, id }
}

async function remove({ id, action }: IRemove): Promise<boolean> {
  const transaction = await get(id)

  if (!transaction) throw new Error("transaction not found")

  if (!action || action === "current") {
    await transactionRepository.remove(id)
    return true
  }

  const filtersList = generateFiltersListRemove(transaction, action)
  const { data: transactions } = await transactionRepository.list(filtersList)

  // TODO: quando não tiver dados, retornar um obj diferente ou um erro?
  // {
  //   success: false,
  //   message: "transactions not found",
  // }
  if (!transactions) return false

  const idTransactions = transactions.map(transaction => transaction.id)

  const respondeMany = await transactionRepository.removeMany(idTransactions)

  return !!respondeMany
}

export const transactionService = {
  list,
  get,
  post,
  put,
  patch,
  remove,
}
