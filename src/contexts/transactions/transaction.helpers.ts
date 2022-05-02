import { ITransaction, ITransactionSummary } from "models/transactions/transaction"

export const summaryDefault: ITransactionSummary = {
  deposit: "R$ 0,00",
  withdraw: "R$ 0,00",
  total: "R$ 0,00",
}

export function generateResumeSummary(transactions: ITransaction[]) {
  const deposit = transactions.reduce((acc, transaction) => {
    if (transaction.type === "deposit") {
      return acc + transaction.amount
    }

    return acc
  }, 0)

  const withdraw = transactions.reduce((acc, transaction) => {
    if (transaction.type === "withdraw") {
      return acc + transaction.amount
    }

    return acc
  }, 0)

  const total = deposit - withdraw

  return {
    deposit,
    withdraw,
    total,
  }
}
