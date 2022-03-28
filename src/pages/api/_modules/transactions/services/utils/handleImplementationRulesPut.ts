import { transactionService } from "../transactionService"
import { transactionRepository } from "../../repository/transactionRepository"
import { getObjYearMonthDayUTC, parseObjToUTCandISO } from "../../../../../../utils/dateUtil"
import { generateTransactionToPost } from "./handleTransactions"
import { ITransaction, ITransactionPartial } from "../../types/transaction.type"
import { ITransactionRequestActionParam } from "../../types/transactionRequest.type"

interface IImplementationRulesPut {
  idUser: string
  id: string
  currentTransaction: ITransaction
  transaction: ITransactionPartial
  action?: ITransactionRequestActionParam
}

export const implementationRulesPut = {
  async edit_transaction({ id, transaction }: IImplementationRulesPut) {
    console.log("🔎 - edit_transaction")

    const editedTransaction = await transactionRepository.put(id, transaction)
    return editedTransaction
  },

  async when_to_change_basic_data({ idUser, currentTransaction, transaction, action }: IImplementationRulesPut) {
    console.log("🔎 - when_to_change_basic_data")

    const transactionMapped: ITransactionPartial = {
      title: transaction.title || currentTransaction.title,
      amount: transaction.amount || currentTransaction.amount,
      status: transaction.status || currentTransaction.status,
      type: transaction.type || currentTransaction.type,
    }

    const idRecurrence = transaction.idRecurrence || currentTransaction.idRecurrence

    const dateFilter = transaction.date || currentTransaction.date
    const dateStartISO = action === "next" ? dateFilter : undefined

    const editedTransactions = await transactionRepository.putMany(transactionMapped, {
      idUser,
      idRecurrence,
      dateStartISO,
    })

    return editedTransactions
  },

  async when_to_change_to_be_a_recurrence({ idUser, id, currentTransaction, transaction }: IImplementationRulesPut) {
    console.log("🔎 - when_to_change_to_be_a_recurrence")

    const transactionToPost = generateTransactionToPost(currentTransaction, transaction)

    // TODO: caso uma das operações falhe, é necessário desfazer as outras
    await transactionService.remove({ idUser, id })
    await transactionService.post(transactionToPost)

    return true
  },

  async when_to_change_only_the_day_of_a_date({ idUser, id, transaction, action }: IImplementationRulesPut) {
    console.log("🔎 - when_to_change_only_the_day_of_a_date")

    const idRecurrence = transaction.idRecurrence || ""

    const dateFilter = transaction.date
    const dateStartISO = action === "next" ? dateFilter : undefined

    const transactions = await transactionRepository.list({
      idUser,
      idRecurrence,
      dateStartISO,
    })

    const { day } = getObjYearMonthDayUTC(transaction.date)

    const transactionsToPut = transactions.data.map(currentTransaction => {
      const { month, year } = getObjYearMonthDayUTC(currentTransaction.date)

      // TODO: verificar se a data existe naquele mes
      const date = parseObjToUTCandISO({ day, month, year }, "start")

      const transactionMapped: ITransactionPartial = {
        id: transaction.id || currentTransaction.id,
        title: transaction.title || currentTransaction.title,
        amount: transaction.amount || currentTransaction.amount,
        status: transaction.status || currentTransaction.status,
        type: transaction.type || currentTransaction.type,
        date,
      }

      return transactionMapped
    })

    try {
      const responsePromise = transactionsToPut.map(mappedTransaction => {
        const { id, ...restTransaction } = mappedTransaction
        const idTransaction = String(id)

        const response = transactionRepository.put(idTransaction, restTransaction)

        return response
      })

      Promise.all(responsePromise)

      return true
    } catch (error) {
      console.log("🔎 - error: ", error)
      return false
    }
  },

  async when_to_change_only_the_month_or_year_of_a_date({ idUser, id, currentTransaction, transaction, action }: IImplementationRulesPut) {
    console.log("🔎 - when_to_change_only_the_month_or_year_of_a_date")

    const transactionToPost = generateTransactionToPost(currentTransaction, transaction)

    // TODO: caso uma das operações falhe, é necessário desfazer as outras
    await transactionService.remove({
      idUser,
      id,
      action,
    })
    await transactionService.post(transactionToPost)

    return true
  },

  async when_to_change_typeRecurrence({ idUser, id, currentTransaction, transaction, action }: IImplementationRulesPut) {
    console.log("🔎 - when_to_change_typeRecurrence")

    const transactionToPost = generateTransactionToPost(currentTransaction, transaction)

    // TODO: caso uma das operações falhe, é necessário desfazer as outras
    await transactionService.remove({
      idUser,
      id,
      action,
    })
    await transactionService.post(transactionToPost)

    return true
  },
}
