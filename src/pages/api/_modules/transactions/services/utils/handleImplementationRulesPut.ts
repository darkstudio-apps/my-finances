import { transactionService } from "../transactionService"
import { transactionRepository } from "../../repository/transactionRepository"
import { getObjYearMonthDayUTC, parseObjToUTCandISO } from "../../../../../../utils/dateUtil"
import { generateTransactionsRecurrence, generateTransactionToCreate, generateTransactionToPost } from "./handleTransactions"
import { ITransaction, ITransactionPut } from "../../types/transaction.type"
import { ITransactionRequestQueryActionParam } from "../../types/transactionRequest.type"

interface IImplementationRulesPut {
  idUser: string
  id: string
  currentTransaction: ITransaction
  transaction: ITransactionPut
  action?: ITransactionRequestQueryActionParam
}

export const implementationRulesPut = {
  async edit_transaction({ id, transaction }: IImplementationRulesPut) {
    console.log("🔎 - edit_transaction")

    const editedTransaction = await transactionRepository.put(id, transaction)
    return editedTransaction
  },

  async when_to_change_basic_data({ idUser, currentTransaction, transaction, action }: IImplementationRulesPut) {
    console.log("🔎 - when_to_change_basic_data")

    const transactionMapped: ITransactionPut = {
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
    await transactionService.post(idUser, transactionToPost)

    return true
  },

  async when_to_change_to_not_be_a_recurrence({ idUser, id, currentTransaction, transaction }: IImplementationRulesPut) {
    console.log("🔎 - when_to_change_to_not_be_a_recurrence")

    const _transaction = { ...transaction, installments: "0", isRecurrence: false }
    const transactionToPut = generateTransactionToCreate(currentTransaction, _transaction)

    const dateStartNotInclusive = currentTransaction.date

    const transactions = await transactionRepository.list({ idUser, dateStartNotInclusive })

    const idTransactions = transactions.map(transaction => transaction.id)

    await transactionRepository.put(id, transactionToPut)

    const response = await transactionRepository.removeMany(idUser, idTransactions)

    return !!response
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

    const transactionsToPut = transactions.map(currentTransaction => {
      const { month, year } = getObjYearMonthDayUTC(currentTransaction.date)

      // TODO: verificar se a data existe naquele mes
      const date = parseObjToUTCandISO({ day, month, year }, "start")

      const transactionMapped: ITransactionPut = {
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
    await transactionService.post(idUser, transactionToPost)

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
    await transactionService.post(idUser, transactionToPost)

    return true
  },

  async when_to_change_the_installments({ idUser, id, currentTransaction, transaction, action }: IImplementationRulesPut) {
    console.log("🔎 - when_to_change_the_installments")

    const isMoreInstallments = Number(transaction.installments) > Number(currentTransaction.installments)

    if (isMoreInstallments) {
      // TODO: identificar a data da ultima parcela
      const idRecurrence = currentTransaction.idRecurrence
      const transactions = await transactionRepository.list({ idUser, idRecurrence })

      const lastTransaction = transactions.pop() || currentTransaction

      const transactionToGenerate = generateTransactionToCreate(lastTransaction, transaction)

      // TODO: gerar apenas as tr que falta e com o mesmo idRecurrence
      const [, ...newTransactions] = generateTransactionsRecurrence(transactionToGenerate)

      // TODO: postMany
      await transactionRepository.postMany(idUser, newTransactions)

      return true
    }
    else {
      const idRecurrence = currentTransaction.idRecurrence
      const transactions = await transactionRepository.list({ idUser, idRecurrence })

      const start = Number(transaction.installments)
      const end = transactions.length
      const transactionsToDelete = transactions.slice(start, end)

      const idTransactions = transactionsToDelete.map(transaction => transaction.id)

      const response = await transactionRepository.removeMany(idUser, idTransactions)

      return !!response
    }
  },
}
