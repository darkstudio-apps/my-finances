import { createContext, Dispatch, SetStateAction } from "react"
import { UseMutationResult } from "react-query"
import {
  ITransaction,
  ITransactionFormState,
  ITransactionGetFilters,
  ITransactionModalDeleteState,
  ITransactionModalRecurrenceEditState,
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

  modalRecurrenceEdit: ITransactionModalRecurrenceEditState
  setModalRecurrenceEdit: Dispatch<SetStateAction<ITransactionModalRecurrenceEditState>>
  openModalRecurrenceEdit: (idTransaction: string, transaction: ITransactionRequestBase) => void
  closeModalRecurrenceEdit: () => void

  modalDelete: ITransactionModalDeleteState
  setModalDelete: Dispatch<SetStateAction<ITransactionModalDeleteState>>
  openModalDelete: (idTransaction: string, isRecurrence: boolean) => void
  closeModalDelete: () => void
}

export const TransactionsContext = createContext({} as ITransactionsContext)
