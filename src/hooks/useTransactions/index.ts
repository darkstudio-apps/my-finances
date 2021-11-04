import { useEffect, useState } from "react"
import { parseYearMonthDay, parseDateBr } from "../../utils/dateUtil"
import { UUID } from "../../utils/generateID"
import { formatCurrency } from "../../utils/maskUtil"
import { TransactionReqProps, TransactionModelProps } from "./transactions.type"

export interface TransactionProps extends TransactionReqProps {
  dateDisplay: string
  amountDisplay: string
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

  const getAll = () => {
    const fetchTransactions: TransactionReqProps[] = [
      {
        id: UUID(),
        title: "Desenvolvimento de site",
        amount: 5000,
        date: "2021-11-03T16:21:40.451Z",
        type: "deposit",
        category: "Venda",
      },
    ]

    const mappedTransactions = fetchTransactions.map(transaction => ({
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

    const mapTransaction: TransactionProps = {
      ...newTransaction,
      id: UUID(),
      date: parseYearMonthDay(newTransaction.date),
      dateDisplay: parseDateBr(newTransaction.date),
      amountDisplay: formatCurrency(newTransaction.amount),
    }

    const newTransactions = [
      ...transactions,
      mapTransaction,
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
