import { createContext, Dispatch, SetStateAction } from "react"
import { UseMutationResult } from "react-query"
import { ITransaction, ITransactionGetFilters, ITransactionSummary } from "models/transactions/transaction"
import { ITransactionRequestBase, ITransactionRequestPut } from "models/transactions/transaction.request"

interface ITransactionsContext {
  filters: ITransactionGetFilters
  setFilters: Dispatch<SetStateAction<ITransactionGetFilters>>
  summary: ITransactionSummary
  transactions: {
    data: ITransaction[] | undefined
    isLoading: boolean
    isFetching: boolean
    refetch: () => void
  }
  createTransaction: UseMutationResult<void, unknown, ITransactionRequestBase, unknown>
  editTransaction: UseMutationResult<void, unknown, ITransactionRequestPut, unknown>
  deleteTransaction: UseMutationResult<void, unknown, string, unknown>
}

export const TransactionsContext = createContext(
  {} as ITransactionsContext
)
