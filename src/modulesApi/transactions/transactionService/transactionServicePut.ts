import { transactionRepositoryFindOne } from "../transactionRepository"
import { implementationRulesPut } from "./utils"
import { getObjYearMonthDayUTC } from "utils/dateUtil"
import { ITransactionServicePut } from "../types/transactionService.type"

// TODO: mover essa tipagem para um arquivo de tipagem e forçar o objeto de regras a ter esses metodos implementados
type IEditRule = "edit_transaction"
  | "when_to_change_to_be_a_recurrence"
  | "when_to_change_to_not_be_a_recurrence"
  | "when_to_change_only_the_day_of_a_date"
  | "when_to_change_only_the_month_or_year_of_a_date"
  | "when_to_change_typeRecurrence"
  | "when_to_change_the_installments"
  | "when_to_change_basic_data"

export async function transactionServicePut({
  idUser,
  id,
  transaction,
  action,
}: ITransactionServicePut) {
  const currentTransaction = await transactionRepositoryFindOne(idUser, id)

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
  const responseData = {
    response,
  }

  return responseData
}
