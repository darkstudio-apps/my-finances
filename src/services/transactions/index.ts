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
  ITransactionRequestQueryAction,
} from "models/transactions"

export async function getTransactionsService(
  { month, year }: ITransactionGetFilters
): Promise<ITransaction[]> {
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

export async function createTransactionService(
  transaction: ITransactionRequestPost
): Promise<boolean> {
  const response = await apiClient.post("/transactions", transaction)

  return response.status === 200

  // TODO: tratar o erro criando um obj de erro global
}

export async function editTransactionService(
  id: string,
  transaction: ITransactionRequestBase,
  action?: ITransactionRequestQueryAction
): Promise<boolean> {
  const response = await apiClient.put<ITransactionResponsePut>(`/transactions/${id}`, transaction, {
    params: {
      action,
    },
  })

  return response.status === 200

  // TODO: tratar o erro criando um obj de erro global
}

export async function deleteTransactionService(
  id: string,
  action?: ITransactionRequestQueryAction
): Promise<boolean> {
  const { data } = await apiClient.delete<ITransactionResponseDelete>(`/transactions/${id}`, {
    params: {
      action,
    },
  })

  const status = !!data.message

  return status

  // TODO: tratar o erro criando um obj de erro global
}
