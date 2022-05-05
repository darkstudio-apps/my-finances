import { createContext, Dispatch, SetStateAction } from "react"
import { UseMutationResult } from "react-query"
import {
  ITransaction,
  ITransactionFormState,
  ITransactionGetFilters,
  ITransactionRequestBase,
  ITransactionRequestDelete,
  ITransactionRequestPut,
  ITransactionSummary,
} from "models/transactions"

interface ITransactionsContext {
  filters: ITransactionGetFilters
  setFilters: Dispatch<SetStateAction<ITransactionGetFilters>>
  transactions: {
    data: ITransaction[] | undefined
    isLoading: boolean
    isFetching: boolean
    refetch: () => void
  }
  createTransaction: UseMutationResult<void, unknown, ITransactionRequestBase, unknown>
  editTransaction: UseMutationResult<void, unknown, ITransactionRequestPut, unknown>
  deleteTransaction: UseMutationResult<void, unknown, ITransactionRequestDelete, unknown>

  summary: ITransactionSummary

  transactionForm: ITransactionFormState
  setTransactionForm: Dispatch<SetStateAction<ITransactionFormState>>
  clearStateTransactionForm: () => void
  handleChangeTransactionForm: (prop: string, value: string) => void

  isOpenModalRecurrenceEdit: boolean
  isOpenModalRecurrenceDelete: boolean
  setIsOpenModalRecurrenceEdit: Dispatch<SetStateAction<boolean>>
  setIsOpenModalRecurrenceDelete: Dispatch<SetStateAction<boolean>>
}

export const TransactionsContext = createContext({} as ITransactionsContext)
