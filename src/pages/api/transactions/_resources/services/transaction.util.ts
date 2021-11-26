import { addDays, addMonths } from "date-fns"
import { TransactionModelProps } from "../../../../../hooks/useTransactions/transaction.types"
import { uuid } from "../../../../../utils/generateID"
import { TransactionModelCreateProps } from "../types/transactionRequests.type"

export const generateTransaction = (transaction: TransactionModelProps): TransactionModelCreateProps => {
  const idRecurrence = uuid()

  const mappedTransaction: TransactionModelCreateProps = {
    ...transaction,
    idRecurrence,
  }

  return mappedTransaction
}

export const generateTransactionsRecurrence = (transaction: TransactionModelProps): TransactionModelCreateProps[] => {
  const idRecurrence = uuid()

  // const dateFutureDay = addDays(new Date(date), 15)
  // const dateFutureMonths = addMonths(new Date(date), 3)

  return []
}
