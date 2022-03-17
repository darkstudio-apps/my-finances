import { transactionRepository } from "../repository/transactionRepository"

import { generateTransaction, generateTransactionsRecurrence } from "./transactionService.util"
import { dateNowYearMonthDay, endOfMonthInYearMonthDay, generateDecimalNumberInString, getObjYearMonthDay, parseToUTCandISO } from "../../../../../utils/dateUtil"

import { ITransactionRequestActionParam } from "../types/transactionRequest.type"
import { ITransactionForRegister, ITransactionPartial } from "../types/transaction.type"

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

  const transactions = await transactionRepository.list({ idUser, dateStartISO, dateEndISO })

  // TODO: criar a tipagem desse retorno no arquivo - transactionResponse
  const transactionsData = {
    search: {
      dateStart,
      dateEnd,
    },
    length: transactions?.length || 0,
    data: transactions,
  }

  return transactionsData
}

async function get(id: string) {
  const transaction = await transactionRepository.get(id)

  // TODO: retornar um obj com a tipagem de transactionResponse

  return transaction
}

async function post(transaction: ITransactionForRegister) {
  const isNotRecurrence = !transaction.isRecurrence

  if (isNotRecurrence) {
    const objTransaction = generateTransaction(transaction)

    const createdTransaction = await transactionRepository.post(objTransaction)
    return createdTransaction
  }
  else {
    const transactions = generateTransactionsRecurrence(transaction)

    const createdTransactions = await transactionRepository.postMany(transactions)
    return createdTransactions
  }

  // TODO: retornar um obj com a tipagem de transactionResponse
  // TODO: ter um unico retorno
}

async function put(id: string, transaction: ITransactionPartial) {
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

async function remove({ idUser, id, action }: IRemove) {
  const transaction = await get(id)
  // /(?:)/

  if (!transaction) throw new Error("transaction not found")

  if (action === "all") {
    // TODO: buscar todas as recorrencias pelo idRecurrence
    // transactionRepository.list

    // TODO: fazer um map no array de transactions criar um array de strings com os ids das transactions a serem excluidas

    // TODO: excluir as transactions
    // transactionRepository.removeMany
  }

  if (action === "current") {
    // TODO: buscar todas as recorrencias pelo idRecurrence que são maiores que a data da transaction atual

    // TODO: fazer um map no array de transactions criar um array de strings com os ids das transactions a serem excluidas

    // TODO: excluir as transactions
    // transactionRepository.removeMany
  }

  // const responde = await transactionRepository.remove(id)
  // return responde

  // TODO: retornar um obj com a tipagem de transactionResponse

  return false
}

export const transactionService = {
  list,
  get,
  post,
  put,
  patch,
  remove,
}
