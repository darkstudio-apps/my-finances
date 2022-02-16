import { dateAddDays, dateAddMonths, dateAddYears, dateIsBefore } from "../../../../../utils/dateUtil"
import { uuid } from "../../../../../utils/generateID"

import { TransactionModelCreateProps } from "../types/transactionRequests.type"
import { TransactionModelProps, TransactionTypeRecurrenceProps } from "../../../../../hooks/useTransactions/transaction.types"

export const generateTransaction = (transaction: TransactionModelProps): TransactionModelCreateProps => {
  const idRecurrence = uuid()

  const mappedTransaction: TransactionModelCreateProps = {
    ...transaction,
    idRecurrence,
  }

  return mappedTransaction
}

// --------------- generateTransactionsRecurrence ---------------

const generateDatesByDays = (transaction: TransactionModelProps, days: number) => {
  const { date } = transaction
  const dateYearFuture = dateAddYears(date, 1)

  const datesFuture: string[] = [date]
  let lastFutureDate = date

  while (dateIsBefore(lastFutureDate, dateYearFuture)) {
    const nextFutureDate = dateAddDays(lastFutureDate, days)
    lastFutureDate = nextFutureDate

    if (dateIsBefore(nextFutureDate, dateYearFuture)) {
      datesFuture.push(nextFutureDate)
    }
  }

  return datesFuture
}

const generateDatesByMonths = (transaction: TransactionModelProps, installments: number) => {
  const { date } = transaction

  const datesFuture = [...Array(installments)].map((_, idx) => {
    const monthsAdd = idx
    if (monthsAdd === 0) return date

    const dateFuture = dateAddMonths(date, monthsAdd)
    return dateFuture
  })

  return datesFuture
}

const generateDatesByYears = (transaction: TransactionModelProps, installments: number) => {
  const { date } = transaction

  const datesFuture = [...Array(installments)].map((_, idx) => {
    const yearsAdd = idx
    if (yearsAdd === 0) return date

    const dateFuture = dateAddYears(date, yearsAdd)
    return dateFuture
  })

  return datesFuture
}

const generateDatesRecurrence = {
  every_1_week: (transaction: TransactionModelProps): string[] => {
    return generateDatesByDays(transaction, 7)
  },

  every_15_days: (transaction: TransactionModelProps): string[] => {
    return generateDatesByDays(transaction, 15)
  },

  monthly: (transaction: TransactionModelProps): string[] => {
    return generateDatesByMonths(transaction, 12)
  },

  yearly: (transaction: TransactionModelProps): string[] => {
    return generateDatesByYears(transaction, 2)
  },

  installments: (transaction: TransactionModelProps): string[] => {
    const installments = parseInt(transaction.installments)
    return generateDatesByMonths(transaction, installments)
  },
}

export const generateTransactionsRecurrence = (transaction: TransactionModelProps): TransactionModelCreateProps[] => {
  const idRecurrence = uuid()

  const typeRecurrence = transaction.typeRecurrence as TransactionTypeRecurrenceProps
  if (typeRecurrence === "") return []

  const datesRecurrence = generateDatesRecurrence[typeRecurrence](transaction)

  const transactionsRecurrence = datesRecurrence.map((dateFuture, idx) => {
    const isValidStatus = transaction.status === "deposit" || transaction.status === "withdraw"

    const status = (isValidStatus || idx === 0) ? transaction.status : ""

    return {
      ...transaction,
      date: dateFuture,
      status,
      idRecurrence,
    }
  })

  return transactionsRecurrence
}
