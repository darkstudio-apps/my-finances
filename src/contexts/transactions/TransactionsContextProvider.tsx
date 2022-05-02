import { ReactNode, useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useToast } from "@chakra-ui/react"
import { TransactionsContext } from "./TransactionsContext"
import { generateResumeSummary, summaryDefault, transactionFormInitial } from "./transaction.helpers"
import {
  createTransactionService,
  deleteTransactionService,
  editTransactionService,
  getTransactionsService
} from "services/transactions"
import {
  ITransactionGetFilters,
  ITransactionSummary,
  ITransactionRequestPost,
  ITransactionRequestPut,
  ITransactionFormState,
  ITransactionRequestDelete
} from "models/transactions"
import { dateNowYearMonthDay, getObjYearMonthDay } from "utils/dateUtil"
import { formatCurrency, formatReal } from "utils/maskUtil"

interface ITransactionsContextProvider {
  children: ReactNode
}

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
    '/transactions',
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
      refetchInterval: false
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
        queryClient.invalidateQueries('/transactions')
      },
    }
  )

  const editTransaction = useMutation(async ({ id, transaction, action }: ITransactionRequestPut) => {
    try {
      const editedTransaction = await editTransactionService(id, transaction)

      if (!editedTransaction) return

      toast({
        title: "Transação editada com sucesso!",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      })
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
      queryClient.invalidateQueries('/transactions')
    },
  })

  const deleteTransaction = useMutation(async ({ id, action }: ITransactionRequestDelete) => {
    try {
      const status = await deleteTransactionService(id)

      if (!status) return

      toast({
        title: "Transação removida com sucesso!",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: "Erro ao remover a transação!",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      })
    }
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('/transactions')
    },
  })

  // -------------------- SUMMARY --------------------

  const [summary, setSummary] = useState<ITransactionSummary>(summaryDefault)

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const { deposit, withdraw, total } = generateResumeSummary(transactions)

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

  const clearStateTransactionForm = () => {
    setTransactionForm(transactionFormInitial)
  }

  const handleChangeTransactionForm = (prop: string, value: string) => {
    if (prop === "amount") value = formatReal(value)

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

    setTransactionForm({
      ...transactionForm,
      [prop]: value,
    })
  }

  return (
    <TransactionsContext.Provider value={{
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

      transactionForm,
      setTransactionForm,
      clearStateTransactionForm,
      handleChangeTransactionForm,
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}
