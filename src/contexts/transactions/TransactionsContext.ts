import { createContext, Dispatch, SetStateAction } from "react"
import { UseMutationResult } from "react-query"
import {
  ITransaction,
  ITransactionFormState,
  ITransactionGetFilters,
  ITransactionModalDeleteState,
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
  modalDelete: ITransactionModalDeleteState
  setIsOpenModalRecurrenceEdit: Dispatch<SetStateAction<boolean>>
  setModalDelete: Dispatch<SetStateAction<ITransactionModalDeleteState>>
  openModalDelete: (idTransaction: string, isRecurrence: boolean) => void
  closeModalDelete: () => void
}

export const TransactionsContext = createContext({} as ITransactionsContext)
