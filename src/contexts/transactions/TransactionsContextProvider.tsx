import { ReactNode, useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useToast } from "@chakra-ui/react"
import { TransactionsContext } from "./TransactionsContext"
import { generateResumeSummary, summaryDefault } from "./transaction.helpers"
import { createTransactionService, deleteTransactionService, editTransactionService, getTransactionsService } from "services/transactions"
import { ITransactionGetFilters, ITransactionSummary } from "models/transactions/transaction"
import { ITransactionRequestPost, ITransactionRequestPut } from "models/transactions/transaction.request"
import { dateNowYearMonthDay, getObjYearMonthDay } from "utils/dateUtil"
import { formatCurrency } from "utils/maskUtil"

interface ITransactionsContextProvider {
  children: ReactNode
}

export function TransactionsContextProvider({ children }: ITransactionsContextProvider) {
  const toast = useToast()
  const queryClient = useQueryClient()

  const [summary, setSummary] = useState<ITransactionSummary>(summaryDefault)

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

  const deleteTransaction = useMutation(async (id: string) => {
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

  return (
    <TransactionsContext.Provider value={{
      filters,
      setFilters,
      summary,
      transactions: {
        data: transactions,
        isLoading,
        isFetching,
        refetch,
      },
      createTransaction,
      editTransaction,
      deleteTransaction,
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}
