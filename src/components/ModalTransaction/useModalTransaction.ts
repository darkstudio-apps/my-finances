import { getSession } from "next-auth/react"
import { useState } from "react"
import { TransactionModelProps, TransactionStateProps, TransactionTypeProps } from "../../hooks/useTransactions/transaction.types"
import { parseToUTCandISO } from "../../utils/dateUtil"
import { formatCurrency, formatFloat, formatReal } from "../../utils/maskUtil"

const transactionObjInitial: TransactionStateProps = {
  title: "",
  amount: "0,00",
  date: "",
  status: "",
  typeRecurrence: "",
  installments: "",
  type: null,
}

export function useModalTransaction() {
  const [transaction, setTransaction] = useState<TransactionStateProps>(transactionObjInitial)

  const handleChangeTransaction = (prop: string, value: string) => {
    if (prop === "amount") value = formatReal(value)

    if (prop === "status") {
      const type = value === "deposit" || value === "withdraw"
        ? value
        : transaction.type

      return setTransaction({
        ...transaction,
        status: value,
        type,
      })
    }

    if (prop === "type") {
      if (transaction.status === "deposit" || transaction.status === "withdraw") {

        const type = value === "deposit" || value === "withdraw"
          ? value
          : null

        return setTransaction({
          ...transaction,
          status: value,
          type,
        })
      }
    }

    if (prop === "installments" && value) {
      const amounts = formatFloat(transaction.amount)

      const installments = Number(value)

      const total = amounts / installments

      const totalAmount = formatCurrency(total)

      return setTransaction({
        ...transaction,
        amount: totalAmount.replace("R$", ""),
        installments: value,
      })
    }

  }

  const validateTransaction = () => {
    const { title, date } = transaction

    const includesValueEmpty = [title, date].includes("")
    const amountZero = transaction.amount === "0,00"
    const isTypeNull = transaction.type === null

    if (includesValueEmpty || amountZero || isTypeNull) {
      return false
    }

    return true
  }

  const generateTransactionToSave = async (): Promise<TransactionModelProps | null> => {
    if (transaction.type === null) return null

    const session: any = await getSession()

    const idUser = session?.user?.idUser
    if (!idUser) return null

    const type: TransactionTypeProps = transaction.type

    // TODO: essa prop agora é gerada no backend
    const isRecurrence = transaction.typeRecurrence !== ""

    const newTransaction: TransactionModelProps = {
      ...transaction,
      idUser,
      type,
      isRecurrence,
      amount: formatFloat(transaction.amount),
      date: parseToUTCandISO(transaction.date, "start"),
    }

    return newTransaction
  }

  const clearState = () => {
    setTransaction(transactionObjInitial)
  }

  return {
    transaction,
    setTransaction: (transaction: TransactionStateProps | null) => {
      if (transaction) setTransaction(transaction)
      else setTransaction(transactionObjInitial)
    },
    handleChangeTransaction,
    validateTransaction,
    generateTransactionToSave,
    clearState,
  }
}
