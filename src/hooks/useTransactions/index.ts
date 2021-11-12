import { useEffect, useState } from "react"
import { api } from "../../services/api"
import { UUID } from "../../utils/generateID"
import { TransactionReqProps, TransactionModelProps } from "./transaction.types"
import { formatCurrency } from "../../utils/maskUtil"
import { parseDateBr, parseYearMonthDay } from "../../utils/dateUtil"

export interface TransactionProps extends TransactionReqProps {
  dateDisplay: string
  amountDisplay: string
}

interface GetType {
  transactions: TransactionReqProps[]
}

export function useTransactions() {
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

  const create = (transaction: TransactionModelProps) => {
    const newTransaction: TransactionReqProps = {
      ...transaction,
      id: UUID(),
    }

    const formattedTransaction: TransactionProps = {
      ...newTransaction,
      id: UUID(),
      date: parseYearMonthDay(newTransaction.date),
      dateDisplay: parseDateBr(newTransaction.date),
      amountDisplay: formatCurrency(newTransaction.amount),
    }

    const newTransactions = [
      ...transactions,
      formattedTransaction,
    ]

    setTransactions(newTransactions)
  }

  const edit = (transaction: TransactionProps) => {
    console.log("edit: ", transaction)
  }

  const remove = (transaction: TransactionProps) => {
    console.log("remove: ", transaction)
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
