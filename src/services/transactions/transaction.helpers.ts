import { ITransaction, ITransactionResponse } from "models/transactions"
import { parseDateBrUTC, parseYearMonthDayUTC } from "utils/dateUtil"
import { formatCurrency } from "utils/maskUtil"

const statusDisplayObj: any = {
  deposit: "A receber",
  withdraw: "A pagar",
  overdue: "Vencido",
  paid: "Pago",
}

export function getStatusDisplay(status: string, type: string) {
  if (status === "paid" && type === "deposit") return "Recebido"

  const statusDisplay = statusDisplayObj[status]
  return statusDisplay
}

export function generateTransaction(transaction: ITransactionResponse): ITransaction {
  const dateUTC = transaction.date
  const statusDisplay = transaction.status
    ? getStatusDisplay(transaction.status, transaction.type)
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
