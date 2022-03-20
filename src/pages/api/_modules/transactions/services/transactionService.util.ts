import { dateAddDays, dateAddMonths, dateAddYears, dateIsBefore } from "../../../../../utils/dateUtil"
import { uuid } from "../../../../../utils/generateID"
import { ITransactionForCreate, ITransactionForRegister, ITransactionTypeRecurrenceProp } from "../types/transaction.type"

export const generateTransaction = (transaction: ITransactionForRegister): ITransactionForCreate => {
  const isRecurrence = transaction.typeRecurrence !== ""
  const idRecurrence = uuid()

  const mappedTransaction: ITransactionForCreate = {
    ...transaction,
    isRecurrence,
    idRecurrence,
  }

  return mappedTransaction
}

// --------------- generateTransactionsRecurrence ---------------

const generateDatesByDays = (transaction: ITransactionForRegister, days: number) => {
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

const generateDatesByMonths = (transaction: ITransactionForRegister, installments: number) => {
  const { date } = transaction

  const datesFuture = [...Array(installments)].map((_, idx) => {
    const monthsAdd = idx
    if (monthsAdd === 0) return date

    const dateFuture = dateAddMonths(date, monthsAdd)
    return dateFuture
  })

  return datesFuture
}

const generateDatesByYears = (transaction: ITransactionForRegister, installments: number) => {
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
  every_1_week: (transaction: ITransactionForRegister): string[] => {
    return generateDatesByDays(transaction, 7)
  },

  every_15_days: (transaction: ITransactionForRegister): string[] => {
    return generateDatesByDays(transaction, 15)
  },

  monthly: (transaction: ITransactionForRegister): string[] => {
    return generateDatesByMonths(transaction, 12)
  },

  yearly: (transaction: ITransactionForRegister): string[] => {
    return generateDatesByYears(transaction, 2)
  },

  installments: (transaction: ITransactionForRegister): string[] => {
    const installments = parseInt(transaction.installments)
    return generateDatesByMonths(transaction, installments)
  },
}

export const generateTransactionsRecurrence = (transaction: ITransactionForCreate): ITransactionForCreate[] => {
  const typeRecurrence = transaction.typeRecurrence as ITransactionTypeRecurrenceProp
  if (typeRecurrence === "") return []

  const datesRecurrence = generateDatesRecurrence[typeRecurrence](transaction)

  const transactionsRecurrence = datesRecurrence.map((dateFuture, idx) => {
    const isValidStatus = transaction.status === "deposit" || transaction.status === "withdraw"

    const status = (isValidStatus || idx === 0) ? transaction.status : ""

    return {
      ...transaction,
      date: dateFuture,
      status,
    }
  })

  return transactionsRecurrence
}
