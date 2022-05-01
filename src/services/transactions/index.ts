import { api } from "libs/api"
import { generateTransaction } from "./transaction.helpers"
import { ITransaction, ITransactionGetFilters, ITransactionRequestGet, ITransactionRequestPost } from "models/transactions/transaction"

export async function getTransactionsService({ month, year }: ITransactionGetFilters): Promise<ITransaction[]> {
  const { data: transactions } = await api.get<ITransactionRequestGet>("/transactions", {
    params: {
      month,
      year,
    },
  })

  const mappedTransactions: ITransaction[] = transactions.data.map(transaction => {
    const transactionMapped = generateTransaction(transaction)
    return transactionMapped
  })

  return mappedTransactions

  // TODO: tratar o erro criando um obj de erro global
}

export async function getTransactionService() {
  console.log("getTransactionService")
}

export async function createTransactionService(transaction: ITransactionRequestPost): Promise<ITransaction | undefined> {
  const { data } = await api.post<ITransactionRequestGet>("/transactions", transaction)

  const transactionCreated = data.transaction
  if (!transactionCreated) return undefined

  const transactionMapped = generateTransaction(transactionCreated)

  return transactionMapped
}

export async function editTransactionService() {
  console.log("editTransactionService")
}

export async function deleteTransactionService() {
  console.log("deleteTransactionService")
}
