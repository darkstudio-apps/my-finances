import { transactionRepository } from "../../repository/transactionRepository"
import { ITransaction, ITransactionPartial } from "../../types/transaction.type"
import { ITransactionRequestActionParam } from "../../types/transactionRequest.type"
import { transactionService } from "../transactionService"
import { generateTransactionToPost } from "./handleTransactions"

interface IImplementationRulesPut {
  idUser: string
  id: string
  currentTransaction: ITransaction
  transaction: ITransactionPartial
  action?: ITransactionRequestActionParam
}

export const implementationRulesPut = {
  async edit_transaction({ idUser, id, currentTransaction, transaction }: IImplementationRulesPut) {
    const editedTransaction = await transactionRepository.put(id, transaction)
    return editedTransaction
  },

  async when_to_change_to_be_a_recurrence({ idUser, id, currentTransaction, transaction }: IImplementationRulesPut) {
    const transactionToPost = generateTransactionToPost(currentTransaction, transaction)

    await transactionService.post(transactionToPost)
    await transactionService.remove({ idUser, id })

    return true
  },

  when_to_change_only_the_day_of_a_date({ idUser, id, currentTransaction, transaction }: IImplementationRulesPut) {

  },

  when_to_change_typeRecurrence({ idUser, id, currentTransaction, transaction }: IImplementationRulesPut) {

  },

  async when_to_change_basic_data({ idUser, id, currentTransaction, transaction, action }: IImplementationRulesPut) {
    const idRecurrence = transaction.idRecurrence || currentTransaction.idRecurrence

    const transactionMapped: ITransactionPartial = {
      title: transaction.title || currentTransaction.title,
      amount: transaction.amount || currentTransaction.amount,
      status: transaction.status || currentTransaction.status,
      type: transaction.type || currentTransaction.type,
    }

    const editedTransactions = await transactionRepository.putMany(idRecurrence, transactionMapped)

    return editedTransactions
  },
}
