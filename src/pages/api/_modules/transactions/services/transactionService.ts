import { transactionRepository } from "../repository/transactionRepository"
import { generateTransaction, generateTransactionsRecurrence, implementationRulesPut } from "./utils"
import {
  dateNowYearMonthDay,
  endOfMonthInYearMonthDay,
  generateDecimalNumberInString,
  getObjYearMonthDay,
  getObjYearMonthDayUTC,
  parseToUTCandISO,
} from "utils/dateUtil"
import { ITransaction } from "../types/transaction.type"
import {
  ITransactionServiceList,
  ITransactionServicePatch,
  ITransactionServicePost,
  ITransactionServicePut,
  ITransactionServiceRemove,
} from "../types/transactionService.type"
import { ITransactionRequestQueryActionParam } from "../types/transactionRequest.type"
import { ITransactionListResponse } from "../types/transactionResponse.type"

async function list({ idUser, month, year }: ITransactionServiceList): Promise<ITransactionListResponse> {
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

  const transactionsData: ITransactionListResponse = {
    search: {
      dateStart: dateStartISO || "",
      dateEnd: dateEndISO || "",
    },
    length: transactions?.length || 0,
    data: transactions || [],
  }

  return transactionsData
}

async function get(idUser: string, idTransaction: string) {
  const transaction = await transactionRepository.get(idUser, idTransaction)

  // TODO: retornar um obj com a tipagem de transactionResponse
  const transactionData = {
    transaction,
  }

  return transactionData
}

async function post(transaction: ITransactionServicePost) {
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

// TODO: mover essa tipagem para um arquivo de tipagem e forçar o objeto de regras a ter esses metodos implementados
type IEditRule = "edit_transaction"
  | "when_to_change_to_be_a_recurrence"
  | "when_to_change_to_not_be_a_recurrence"
  | "when_to_change_only_the_day_of_a_date"
  | "when_to_change_only_the_month_or_year_of_a_date"
  | "when_to_change_typeRecurrence"
  | "when_to_change_the_installments"
  | "when_to_change_basic_data"

async function put({ idUser, id, transaction, action }: ITransactionServicePut) {
  const currentTransaction = await transactionRepository.get(idUser, id)

  if (!currentTransaction) throw new Error("transaction not found")

  const {
    day: dayTransaction,
    month: monthTransaction,
    year: yearTransaction,
  } = getObjYearMonthDayUTC(transaction.date)

  const {
    day: dayCurrentTransaction,
    month: monthCurrentTransaction,
    year: yearCurrentTransaction,
  } = getObjYearMonthDayUTC(currentTransaction.date)

  const isSameDay = dayTransaction === dayCurrentTransaction
  const isSameMonth = monthTransaction === monthCurrentTransaction
  const isSameYear = yearTransaction === yearCurrentTransaction

  // quando editar uma transaction
  let editRule: IEditRule = "edit_transaction"

  // quando editar uma transaction que não é uma recorrência para ser uma recorrência
  if (currentTransaction.typeRecurrence === "" && transaction.typeRecurrence !== "") {
    editRule = "when_to_change_to_be_a_recurrence"
  }
  // quando editar uma transaction que é uma recorrência para não ser uma recorrência
  else if (transaction.typeRecurrence === "" && currentTransaction.typeRecurrence !== "") {
    editRule = "when_to_change_to_not_be_a_recurrence"
  }
  // quando mudar o tipo de recorrência de uma transaction
  else if (transaction.isRecurrence && transaction.typeRecurrence !== currentTransaction.typeRecurrence) {
    editRule = "when_to_change_typeRecurrence"
  }
  // quando mudar o mês ou ano da data de uma transaction que é uma recorrência
  else if (!isSameMonth || !isSameYear) {
    editRule = "when_to_change_only_the_month_or_year_of_a_date"
  }
  // quando mudar o numero de parcelas
  else if (transaction.installments !== currentTransaction.installments) {
    editRule = "when_to_change_the_installments"
  }
  // quando mudar apenas o dia em relação a data de uma transaction que é uma recorrência
  else if (!isSameDay && isSameMonth && isSameYear && action && action !== "current") {
    editRule = "when_to_change_only_the_day_of_a_date"
    throw new Error("when_to_change_only_the_day_of_a_date not implemented")
  }
  // quando mudar só os dados basicos de uma transaction que é uma recorrência
  else if (transaction.isRecurrence && action && action !== "current") {
    editRule = "when_to_change_basic_data"
  }

  const execImplementationRulePut = implementationRulesPut[editRule]

  const response = await execImplementationRulePut({
    idUser,
    id,
    currentTransaction,
    transaction,
    action,
  })

  // TODO: retornar um obj com a tipagem de transactionResponse

  return response
}

async function patch({ id, transaction }: ITransactionServicePatch) {
  const editedTransaction = await transactionRepository.put(id, transaction)

  // TODO: retornar um obj com a tipagem de transactionResponse

  return editedTransaction
}

const generateFiltersListRemove = (transaction: ITransaction, action?: ITransactionRequestQueryActionParam) => {
  const { id, idUser, idRecurrence, date } = transaction

  const dateStartISO = date

  if (action === "all") return { idUser, idRecurrence }

  if (action === "next") return { idUser, idRecurrence, dateStartISO }

  return { idUser, id }
}

async function remove({ idUser, id, action }: ITransactionServiceRemove): Promise<boolean> {
  const { transaction } = await get(idUser, id)

  if (!transaction) throw new Error("transaction not found")

  if (!action || action === "current") {
    await transactionRepository.remove(id)
    return true
  }

  const filtersList = generateFiltersListRemove(transaction, action)
  const transactions = await transactionRepository.list(filtersList)

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
