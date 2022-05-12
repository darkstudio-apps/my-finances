import { getSession } from "next-auth/react"
import { parseToUTCandISO } from "utils/dateUtil"
import { formatFloat } from "utils/maskUtil"
import {
  ITransactionFormState,
  ITransactionPropType,
  ITransactionRequestBase,
  ITransactionSummary,
  ITransaction,
} from "models/transactions"

export const transactionFormInitial: ITransactionFormState = {
  title: "",
  amount: "0,00",
  date: "",
  status: "",
  typeRecurrence: "",
  installments: "",
  type: null,
}

export const summaryDefault: ITransactionSummary = {
  deposit: "R$ 0,00",
  withdraw: "R$ 0,00",
  total: "R$ 0,00",
}

export function generateResumeSummary(transactions: ITransaction[]) {
  try {
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

    return {
      deposit,
      withdraw,
      total,
    }
  } catch {
    return {
      deposit: 0,
      withdraw: 0,
      total: 0,
    }
  }
}

export function validateTransaction(transaction: ITransactionFormState): boolean {
  try {
    const { title, date } = transaction

    const includesValueEmpty = [title, date].includes("")
    const amountZero = transaction.amount === "0,00"
    const isTypeNull = transaction.type === null

    if (includesValueEmpty || amountZero || isTypeNull) {
      return false
    }

    return true
  } catch {
    return false
  }
}

export async function generateTransactionToSave(
  transaction: ITransactionFormState
): Promise<ITransactionRequestBase | null> {
  try {
    if (transaction.type === null) return null

    const session: any = await getSession()

    const idUser = session?.user?.idUser
    if (!idUser) return null

    const type: ITransactionPropType = transaction.type

    const newTransaction: ITransactionRequestBase = {
      ...transaction,
      idUser,
      type,
      amount: formatFloat(transaction.amount),
      date: parseToUTCandISO(transaction.date, "start"),
    }

    return newTransaction

  } catch (error) {
    return null
  }
}
