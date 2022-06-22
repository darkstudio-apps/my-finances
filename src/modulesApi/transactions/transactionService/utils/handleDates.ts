import { dateAddDays, dateAddMonths, dateAddYears, dateIsBefore } from "utils/dateUtil"
import { ITransactionServicePost } from "../../types/transactionService.type"

const generateDatesByDays = (transaction: ITransactionServicePost, days: number) => {
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

const generateDatesByMonths = (transaction: ITransactionServicePost, installments: number) => {
  const { date } = transaction

  const datesFuture = [...Array(installments)].map((_, idx) => {
    const monthsAdd = idx
    if (monthsAdd === 0) return date

    const dateFuture = dateAddMonths(date, monthsAdd)
    return dateFuture
  })

  return datesFuture
}

const generateDatesByYears = (transaction: ITransactionServicePost, installments: number) => {
  const { date } = transaction

  const datesFuture = [...Array(installments)].map((_, idx) => {
    const yearsAdd = idx
    if (yearsAdd === 0) return date

    const dateFuture = dateAddYears(date, yearsAdd)
    return dateFuture
  })

  return datesFuture
}

export const generateDatesRecurrence = {
  every_1_week: (transaction: ITransactionServicePost): string[] => {
    return generateDatesByDays(transaction, 7)
  },

  every_15_days: (transaction: ITransactionServicePost): string[] => {
    return generateDatesByDays(transaction, 15)
  },

  monthly: (transaction: ITransactionServicePost): string[] => {
    return generateDatesByMonths(transaction, 12)
  },

  yearly: (transaction: ITransactionServicePost): string[] => {
    return generateDatesByYears(transaction, 2)
  },

  installments: (transaction: ITransactionServicePost): string[] => {
    const installments = parseInt(transaction.installments)
    return generateDatesByMonths(transaction, installments)
  },
}
