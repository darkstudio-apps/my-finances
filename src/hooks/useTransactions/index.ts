import { useEffect, useState } from "react"
import { useToast } from "@chakra-ui/react"
import { api } from "../../services/api"
import { TransactionReqProps, TransactionModelProps } from "./transaction.types"
import { formatCurrency } from "../../utils/maskUtil"
import { parseDateBr, parseYearMonthDay } from "../../utils/dateUtil"

export interface TransactionProps extends TransactionReqProps {
  dateDisplay: string
  amountDisplay: string
}

interface GetType {
  transactions: TransactionReqProps[]
  transaction?: TransactionReqProps
}

export function useTransactions() {
  const toast = useToast()

  const [transactions, setTransactions] = useState<TransactionProps[]>([])
  const [summary, setSummary] = useState({
    deposit: "R$ 0,00",
    withdraw: "R$ 0,00",
    total: "R$ 0,00",
  })

  useEffect(() => { getAll() }, [])

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
    }
  }, [transactions])

  const getAll = async () => {
    const { data } = await api.get<GetType>("/transactions")

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

      toast({
        title: "Transação criada com sucesso!",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      })

      getAll()
    } catch (error) {
      toast({
        title: "Erro ao criar a transação!",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const edit = async (id: string, transaction: TransactionModelProps) => {
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

      getAll()
    } catch (error) {
      toast({
        title: "Erro ao editar a transação!",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const remove = async (idTransaction: string) => {
    try {
      const { status } = await api.delete<{ ok?: true }>(`/transactions/${idTransaction}`)

      if (status === 200) {
        getAll()

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
  }

  return {
    transactions,
    summary,
    refrash: getAll,
    create,
    edit,
    remove,
  }
}
