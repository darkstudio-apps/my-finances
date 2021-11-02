import { useEffect, useState } from "react"
import { UUID } from "../../utils/generateID"
import { formatCurrency } from "../../utils/maskUtil"
import { TransactionReqProps, TransactionModelProps } from "./transactions.type"

export type TransactionProps = TransactionReqProps

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
    const fetchTransactions: TransactionProps[] = [
      {
        id: UUID(),
        title: "Desenvolvimento de site",
        amount: 5000,
        date: "13/04/2021",
        type: "deposit",
        category: "Venda",
      },
    ]

    setTransactions(fetchTransactions)
  }

  const create = (transaction: TransactionModelProps) => {
    const newTransaction: TransactionProps = {
      ...transaction,
      id: UUID(),
    }

    const newTransactions = [
      ...transactions,
      newTransaction,
    ]

    setTransactions(newTransactions)
  }

  const edit = (transaction: TransactionProps) => {
    console.log("edit: ", transaction)
  }

  const remove = (transaction: TransactionModelProps) => {
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
