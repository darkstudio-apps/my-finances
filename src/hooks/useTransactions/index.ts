import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useToast } from "@chakra-ui/react"

import { api } from "../../services/api"
import { TransactionReqProps, TransactionModelProps, ITransactionActionRequest, ITransactionEditRequest } from "./transaction.types"
import { formatCurrency } from "../../utils/maskUtil"
import { dateNowYearMonthDay, getObjYearMonthDay, parseDateBrUTC, parseYearMonthDayUTC } from "../../utils/dateUtil"
import { getStatusDisplay, summaryDefault } from "./transaction.util"

export interface TransactionProps extends TransactionReqProps {
  dateDisplay: string
  amountDisplay: string
  statusDisplay: string
}

interface GetType {
  search: {
    dateStart: number // aaaa-mm-dd
    dateEnd: number // aaaa-mm-dd
  },
  length: number
  data: TransactionReqProps[]

  transaction?: TransactionReqProps
}

export function useTransactions() {
  const toast = useToast()
  const queryClient = useQueryClient()

  const { data: transactions, isLoading, refetch, isFetching } = useQuery('/transactions', async () => {
    try {
      const { data: transactions } = await api.get<GetType>("/transactions", {
        params: {
          month: filters.month,
          year: filters.year,
        },
      })

      const mappedTransactions: TransactionProps[] = transactions.data.map(transaction => {
        const dateUTC = transaction.date
        const statusDisplay = transaction.status ? getStatusDisplay(transaction.status) : ""

        return {
          ...transaction,
          date: parseYearMonthDayUTC(dateUTC),
          dateDisplay: parseDateBrUTC(dateUTC),
          amountDisplay: formatCurrency(transaction.amount),
          statusDisplay,
        }
      })

      return mappedTransactions
    } catch (error) {
      toast({
        title: "Erro ao listar as transações!",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      })
    }
  }, {
    refetchInterval: false
  })

  const [summary, setSummary] = useState(summaryDefault)

  const [filters, setFilters] = useState(() => {
    const dateYearMonthDay = dateNowYearMonthDay()
    const { month, year } = getObjYearMonthDay(dateYearMonthDay)
    return { month, year }
  })

  useEffect(() => { refetch() }, [])

  useEffect(() => { refetch() }, [filters.month, filters.year])

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const deposit = transactions.reduce((acc, transaction) => {
        if (transaction.type === "deposit") {
          return acc + transaction.amount
        }

        return acc
      }, 0)

      const withdraw = transactions.reduce((acc, transaction) => {
        if (transaction.type === "withdraw") {
          return acc + transaction.amount
        }

        return acc
      }, 0)

      const total = deposit - withdraw

      setSummary({
        deposit: formatCurrency(deposit),
        withdraw: formatCurrency(withdraw),
        total: formatCurrency(total),
      })
    } else {
      setSummary(summaryDefault)
    }
  }, [transactions])

  const create = useMutation(async (transaction: TransactionModelProps) => {
    try {
      const { data } = await api.post<GetType>("/transactions", transaction)
      if (!data.transaction) return

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
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('/transactions')
    },
  })

  const edit = useMutation(async ({ id, transaction, action }: ITransactionEditRequest) => {
    try {
      const { data } = await api.put<GetType>(`/transactions/${id}`, transaction)
      if (!data.transaction) return

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

  const remove = useMutation(async (idTransaction: string) => {
    try {
      const { status } = await api.delete<{ ok?: true }>(`/transactions/${idTransaction}`)

      if (status === 200) {
        toast({
          title: "Transação removida com sucesso!",
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        })
      }
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

  return {
    transactions: {
      data: transactions,
      isLoading,
      isFetching,
      refetch,
    },
    filters,
    setFilters,
    summary,
    create,
    edit,
    remove,
  }
}
