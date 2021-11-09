import { useState } from "react"
import { TransactionModelProps, TransactionTypeProps } from "../../hooks/useTransactions/transaction.types"
import { parseToUTCandISO } from "../../utils/dateUtil"
import { formatFloat, formatReal } from "../../utils/maskUtil"

interface TransactionStateProps {
  title: string
  amount: string
  date: string
  type: TransactionTypeProps | null
}

const transactionObjInitial: TransactionStateProps = {
  title: "",
  amount: "0,00",
  date: "",
  type: null,
}

export function useModalTransaction() {
  const [transaction, setTransaction] = useState<TransactionStateProps>(transactionObjInitial)

  const handleChangeTransaction = (prop: string, value: string) => {
    if (prop === "amount") value = formatReal(value)

    setTransaction({
      ...transaction,
      [prop]: value,
    })
  }

  const generateTransactionToSave = (): TransactionModelProps | null => {
    const includesValueEmpty = Object.values(transaction).includes("")
    const amountZero = transaction.amount === "0,00"

    if (includesValueEmpty || amountZero || transaction.type === null) {
      return null
    }

    const type: TransactionTypeProps = transaction.type

    const newTransaction: TransactionModelProps = {
      ...transaction,
      type,
      amount: formatFloat(transaction.amount),
      date: parseToUTCandISO(transaction.date),
    }

    return newTransaction
  }

  const clearState = () => {
    setTransaction(transactionObjInitial)
  }

  return {
    transaction,
    handleChangeTransaction,
    generateTransactionToSave,
    clearState,
  }
}
