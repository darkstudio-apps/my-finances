import { ITransaction, ITransactionResponse } from "models/transactions"
import { parseDateBrUTC, parseYearMonthDayUTC } from "utils/dateUtil"
import { formatCurrency } from "utils/maskUtil"

const statusDisplayObj: any = {
  withdraw: "A pagar",
  paid: "Pago",
  deposit: "A receber",
  received: "Recebido",
  overdue: "Vencido",
}

export function getStatusDisplay(status: string) {
  const statusDisplay = statusDisplayObj[status]
  return statusDisplay
}

export function generateTransaction(transaction: ITransactionResponse): ITransaction {
  const dateUTC = transaction.date
  const statusDisplay = transaction.status
    ? getStatusDisplay(transaction.status)
    : ""

  const transactionMapped: ITransaction = {
    ...transaction,
    date: parseYearMonthDayUTC(dateUTC),
    dateDisplay: parseDateBrUTC(dateUTC),
    amountDisplay: formatCurrency(transaction.amount),
    statusDisplay,
  }

  return transactionMapped
}
