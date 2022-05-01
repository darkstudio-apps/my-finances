import { TransactionProps } from "."

export const summaryDefault = {
  deposit: "R$ 0,00",
  withdraw: "R$ 0,00",
  total: "R$ 0,00",
}

const statusDisplay: any = {
  deposit: "À receber",
  withdraw: "À pagar",
  overdue: "Vencido",
  paid: "Pago",
}

export function getStatusDisplay(status: string) {
  return statusDisplay[status]
}

export function generateResumeSummary(transactions: TransactionProps[]) {
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
