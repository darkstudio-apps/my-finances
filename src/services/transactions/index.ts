import { api } from "libs/api"
import { ITransaction, ITransactionGetFilters, ITransactionRequestGet } from "models/transactions/transaction"
import { parseDateBrUTC, parseYearMonthDayUTC } from "utils/dateUtil"
import { formatCurrency } from "utils/maskUtil"
import { getStatusDisplay } from "hooks/useTransactions/transaction.util"

export async function getTransactionsService({ month, year }: ITransactionGetFilters): Promise<ITransaction[]> {
  const { data: transactions } = await api.get<ITransactionRequestGet>("/transactions", {
    params: {
      month,
      year,
    },
  })

  const mappedTransactions: ITransaction[] = transactions.data.map(transaction => {
    const dateUTC = transaction.date
    const statusDisplay = transaction.status ? getStatusDisplay(transaction.status) : ""

    const transactionMapped: ITransaction = {
      ...transaction,
      date: parseYearMonthDayUTC(dateUTC),
      dateDisplay: parseDateBrUTC(dateUTC),
      amountDisplay: formatCurrency(transaction.amount),
      statusDisplay,
    }

    return transactionMapped
  })

  return mappedTransactions

  // TODO: tratar o erro criando um obj de erro global
}

export function getTransactionService() {
  console.log("getTransactionService")
}

export function createTransactionService() {
  console.log("createTransactionService")
}

export function editTransactionService() {
  console.log("editTransactionService")
}

export function deleteTransactionService() {
  console.log("deleteTransactionService")
}
