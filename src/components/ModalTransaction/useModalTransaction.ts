import { getSession } from "next-auth/react"
import { useState } from "react"
import { TransactionModelProps, TransactionStateProps, TransactionTypeProps } from "../../hooks/useTransactions/transaction.types"
import { parseToUTCandISO } from "../../utils/dateUtil"
import { formatFloat, formatReal } from "../../utils/maskUtil"

const transactionObjInitial: TransactionStateProps = {
  title: "",
  amount: 0,
  amountDisplay: "0,00",
  date: "",
  status: "",
  typeRecurrence: "",
  installments: "",
  type: null,
}

export function useModalTransaction() {
  const [transaction, setTransaction] = useState<TransactionStateProps>(transactionObjInitial)

  const handleChangeTransaction = (prop: string, value: string) => {
    if (prop === "amount") {
      const amountDisplay = formatReal(value)
      const amount = formatFloat(amountDisplay)

      return setTransaction({
        ...transaction,
        amountDisplay,
        amount,
      })
    }

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

    if (prop === "installments") {
      const currentAmount = transaction.amount

      const currentInstalments = Number(transaction.installments)
      const editedInstalments = Number(value)

      const totalAmount = currentInstalments === 0
        ? currentAmount
        : currentInstalments * currentAmount

      const editedAmount = editedInstalments > 0
        ? totalAmount / editedInstalments
        : totalAmount

      const amountDisplay = formatReal(editedAmount)

      return setTransaction({
        ...transaction,
        installments: value,
        amount: editedAmount,
        amountDisplay,
      })
    }

    setTransaction({
      ...transaction,
      [prop]: value,
    })
  }

  const validateTransaction = () => {
    const { title, date } = transaction

    const includesValueEmpty = [title, date].includes("")
    const amountZero = transaction.amountDisplay === "0,00"
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
      idUser,
      title: transaction.title,
      amount: transaction.amount,
      status: transaction.status,
      typeRecurrence: transaction.typeRecurrence,
      installments: transaction.installments,
      type,
      isRecurrence,
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
