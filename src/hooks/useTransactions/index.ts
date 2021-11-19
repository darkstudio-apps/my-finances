import { useEffect, useState } from "react"
import { useToast } from "@chakra-ui/react"
import { api } from "../../services/api"
import { TransactionReqProps, TransactionModelProps } from "./transaction.types"
import { formatCurrency } from "../../utils/maskUtil"
import { getObjYearMonthDay, parseDateBr, parseYearMonthDay } from "../../utils/dateUtil"

export interface TransactionProps extends TransactionReqProps {
  dateDisplay: string
  amountDisplay: string
}

interface GetType {
  transactions: TransactionReqProps[]
  transaction?: TransactionReqProps
}

const summaryDefault = {
  deposit: "R$ 0,00",
  withdraw: "R$ 0,00",
  total: "R$ 0,00",
}

export function useTransactions() {
  const toast = useToast()

  const [filters, setFilters] = useState(() => {
    const { month, year } = getObjYearMonthDay()
    return { month, year }
  })

  const [transactions, setTransactions] = useState<TransactionProps[]>([])
  const [summary, setSummary] = useState(summaryDefault)

  useEffect(() => {
    if (transactions.length > 0) {
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

  useEffect(() => { getAll() }, [filters.month, filters.year])

  useEffect(() => { getAll() }, [])

  const getAll = async () => {
    const { data } = await api.get<GetType>("/transactions", {
      params: {
        month: filters.month,
        year: filters.year,
      },
    })

    const mappedTransactions = data.transactions.map(transaction => ({
      ...transaction,
      date: parseYearMonthDay(transaction.date),
      dateDisplay: parseDateBr(transaction.date),
      amountDisplay: formatCurrency(transaction.amount),
    }))

    setTransactions(mappedTransactions)
  }

  const create = async (transaction: TransactionModelProps) => {
    try {
      const { data } = await api.post<GetType>("/transactions", transaction)
      if (!data.transaction) return

      getAll()
    } catch (error) {
      toast({
        title: "Erro ao criar uma transação!",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const edit = async (id: string, transaction: TransactionModelProps) => {
    const { data } = await api.put<GetType>(`/transactions/${id}`, transaction)
    if (!data.transaction) return

    getAll()
  }

  const remove = async (idTransaction: string) => {
    const { status } = await api.delete<{ ok?: true }>(`/transactions/${idTransaction}`)

    if (status === 200) {
      getAll()
      return true
    }

    return undefined
  }

  return {
    transactions,
    filters,
    setFilters,
    summary,
    refrash: getAll,
    create,
    edit,
    remove,
  }
}
