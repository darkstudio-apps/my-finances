import { apiClient } from "libs/apiClient"
import { generateTransaction } from "./transaction.helpers"
import {
  ITransaction,
  ITransactionGetFilters,
  ITransactionResponseGet,
  ITransactionResponsePut,
  ITransactionResponseDelete,
  ITransactionRequestBase,
  ITransactionRequestPost,
} from "models/transactions"

export async function getTransactionsService({ month, year }: ITransactionGetFilters): Promise<ITransaction[]> {
  const { data: transactions } = await apiClient.get<ITransactionResponseGet>("/transactions", {
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
  const { data } = await apiClient.post<ITransactionResponseGet>("/transactions", transaction)

  const transactionCreated = data.transaction
  if (!transactionCreated) return undefined

  const transactionMapped = generateTransaction(transactionCreated)

  return transactionMapped

  // TODO: tratar o erro criando um obj de erro global
}

export async function editTransactionService(id: string, transaction: ITransactionRequestBase): Promise<ITransaction | undefined> {
  const { data } = await apiClient.put<ITransactionResponsePut>(`/transactions/${id}`, transaction)

  const transactionCreated = data.transaction
  if (!transactionCreated) return undefined

  try {
    const transactionMapped = generateTransaction(transactionCreated)
    return transactionMapped
  } catch (error) {
    return undefined
  }

  // TODO: tratar o erro criando um obj de erro global
}

export async function deleteTransactionService(id: string): Promise<boolean> {
  const { data } = await apiClient.delete<ITransactionResponseDelete>(`/transactions/${id}`)

  const status = !!data.message

  return status

  // TODO: tratar o erro criando um obj de erro global
}
