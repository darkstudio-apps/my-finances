import { ReactNode, useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useToast } from "@chakra-ui/react"
import { TransactionsContext } from "./TransactionsContext"
import { generateTransactionsSummary, summaryDefault, transactionFormInitial } from "./transaction.helpers"
import {
  createTransactionService,
  deleteTransactionService,
  editTransactionService,
  getTransactionsService,
} from "services/transactions"
import {
  ITransactionGetFilters,
  ITransactionSummary,
  ITransactionRequestPost,
  ITransactionRequestPut,
  ITransactionFormState,
  ITransactionRequestDelete,
  ITransactionModalDeleteState,
  ITransactionModalRecurrenceEditState,
  ITransactionRequestBase,
  IModalTransactionForm,
} from "models/transactions"
import { dateNowYearMonthDay, getObjYearMonthDay } from "utils/dateUtil"
import { formatCurrency, formatCurrencyOnlyNumbers, formatFloat, formatReal } from "utils/maskUtil"

interface ITransactionsContextProvider {
  children: ReactNode
}

const transactionsQuerie = "/transactions"

export function TransactionsContextProvider({ children }: ITransactionsContextProvider) {
  const toast = useToast()
  const queryClient = useQueryClient()

  // -------------------- TRANSACTION --------------------

  const [filters, setFilters] = useState<ITransactionGetFilters>(() => {
    const dateYearMonthDay = dateNowYearMonthDay()
    const { month, year } = getObjYearMonthDay(dateYearMonthDay)
    return { month, year }
  })

  const { data: transactions, isLoading, refetch, isFetching } = useQuery(
    transactionsQuerie,
    async () => {
      try {
        const { month, year } = filters

        const mappedTransactions = await getTransactionsService({ month, year })

        return mappedTransactions
      } catch (error) {
        toast({
          title: "Erro ao listar as transações!",
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        })
        return []
      }
    },
    {
      refetchInterval: false,
    }
  )

  useEffect(() => {
    if (filters.month && filters.year) refetch()
  }, [filters.month, filters.year])

  const createTransaction = useMutation(
    async (transaction: ITransactionRequestPost) => {
      try {
        const transactionCreated = await createTransactionService(transaction)

        if (!transactionCreated) return

        toast({
          title: "Transação criada com sucesso!",
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        })

        handleModalTransactionForm({ isOpen: false })
        clearStateTransactionForm()
      } catch (error) {
        toast({
          title: "Erro ao criar a transação!",
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        })
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(transactionsQuerie)
      },
    }
  )

  const editTransaction = useMutation(async ({ id, transaction, action }: ITransactionRequestPut) => {
    try {
      const editedTransaction = await editTransactionService(id, transaction, action)

      if (!editedTransaction) return

      toast({
        title: "Transação editada com sucesso!",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      })

      handleModalTransactionForm({ isOpen: false })
      clearStateTransactionForm()
    } catch (error) {
      toast({
        title: "Erro ao editar a transação!",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      })
    }
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(transactionsQuerie)
    },
  })

  const deleteTransaction = useMutation(async ({ id, action }: ITransactionRequestDelete) => {
    try {
      const status = await deleteTransactionService(id, action)

      if (!status) return

      toast({
        title: "Transação excluida com sucesso!",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: "Erro ao excluir a transação!",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      })
    }
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(transactionsQuerie)
    },
  })

  // -------------------- SUMMARY --------------------

  const [summary, setSummary] = useState<ITransactionSummary>(summaryDefault)

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const { deposit, withdraw, total } = generateTransactionsSummary(transactions)

      setSummary({
        deposit: formatCurrency(deposit),
        withdraw: formatCurrency(withdraw),
        total: formatCurrency(total),
      })
    } else {
      setSummary(summaryDefault)
    }
  }, [transactions])

  // -------------------- FORM --------------------

  const [transactionForm, setTransactionForm] = useState<ITransactionFormState>(transactionFormInitial)

  const clearStateTransactionForm = () => setTransactionForm(transactionFormInitial)

  const handleChangeTransactionForm = (prop: string, value: string) => {
    if (prop === "amount") {
      const amountDisplay = formatReal(value)
      const amount = formatFloat(amountDisplay)

      return setTransactionForm({
        ...transactionForm,
        amountDisplay,
        amount,
      })
    }

    if (prop === "status") {
      const type = value === "deposit" || value === "withdraw"
        ? value
        : transactionForm.type

      return setTransactionForm({
        ...transactionForm,
        status: value,
        type,
      })
    }

    if (prop === "type") {
      if (transactionForm.status === "deposit" || transactionForm.status === "withdraw") {
        const type = value === "deposit" || value === "withdraw"
          ? value
          : null

        return setTransactionForm({
          ...transactionForm,
          status: value,
          type,
        })
      }
    }
    if (prop === "installments") {
      const currentAmount = transactionForm.amount

      const currentInstalments = Number(transactionForm.installments)
      const editedInstalments = Number(value)

      const totalAmount = currentInstalments === 0
        ? currentAmount
        : currentInstalments * currentAmount

      const editedAmount = editedInstalments > 0
        ? totalAmount / editedInstalments
        : totalAmount

      const amountDisplay = formatCurrencyOnlyNumbers(editedAmount)

      return setTransactionForm({
        ...transactionForm,
        installments: value,
        amount: editedAmount,
        amountDisplay,
      })
    }

    setTransactionForm({
      ...transactionForm,
      [prop]: value,
    })
  }

  const [modalTransactionForm, setModalTransactionForm] = useState<IModalTransactionForm>({
    isOpen: false,
    editMode: false,
    dataToEdit: null,
  })

  const handleModalTransactionForm = ({ isOpen, editMode, dataToEdit }: Partial<IModalTransactionForm>) => {
    setModalTransactionForm(oldValue => ({
      isOpen: isOpen !== undefined ? isOpen : oldValue.isOpen,
      editMode: editMode !== undefined ? editMode : oldValue.editMode,
      dataToEdit: dataToEdit !== undefined ? dataToEdit : oldValue.dataToEdit,
    }))
  }

  // -------------------- MODALS RECURRENCE --------------------

  const [modalRecurrenceEdit, setModalRecurrenceEdit] = useState<ITransactionModalRecurrenceEditState>({
    isOpen: false,
    idTransaction: null,
    transaction: null,
  })

  const openModalRecurrenceEdit = (idTransaction: string, transaction: ITransactionRequestBase) => {
    setModalRecurrenceEdit(() => ({
      isOpen: true,
      idTransaction,
      transaction,
    }))
  }

  const closeModalRecurrenceEdit = () => {
    setModalRecurrenceEdit({
      isOpen: false,
      idTransaction: null,
      transaction: null,
    })
  }

  const [modalDelete, setModalDelete] = useState<ITransactionModalDeleteState>({
    isOpenModal: false,
    isOpenModalRecurrence: false,
    idTransaction: null,
    isRecurrence: false,
  })

  const openModalDelete = (idTransaction: string, isRecurrence: boolean) => {
    setModalDelete(oldValue => ({
      ...oldValue,
      idTransaction,
      isOpenModal: !isRecurrence,
      isOpenModalRecurrence: isRecurrence,
    }))
  }

  const closeModalDelete = () => {
    setModalDelete({
      isOpenModal: false,
      isOpenModalRecurrence: false,
      idTransaction: null,
      isRecurrence: false,
    })
  }

  return (
    <TransactionsContext.Provider value={{
      // ----- crud - transaction -----

      filters,
      setFilters,
      transactions: {
        data: transactions,
        isLoading,
        isFetching,
        refetch,
      },
      createTransaction,
      editTransaction,
      deleteTransaction,

      summary,

      // ----- form -----

      transactionForm,
      setTransactionForm,
      clearStateTransactionForm,
      handleChangeTransactionForm,

      modalTransactionForm,
      handleModalTransactionForm,

      // ----- modals -----

      modalRecurrenceEdit,
      setModalRecurrenceEdit,
      openModalRecurrenceEdit,
      closeModalRecurrenceEdit,

      modalDelete,
      setModalDelete,
      openModalDelete,
      closeModalDelete,
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}
