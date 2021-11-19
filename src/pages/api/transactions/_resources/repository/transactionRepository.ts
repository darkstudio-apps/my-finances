import { TransactionModelProps, TransactionReqProps } from "../../../../../hooks/useTransactions/transaction.types"
import { prisma } from "../../../../../services/prisma"

type PartialTransaction = Partial<TransactionReqProps>

interface ListProps {
  idUser: string
  dateStartISO: string
  dateEndISO: string
}

async function list({ idUser, dateStartISO, dateEndISO }: ListProps) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        idUser,
        date: {
          gte: dateStartISO,
          lte: dateEndISO,
        },
      },
      orderBy: {
        date: "asc",
      },
    })

    return transactions
  } catch (error) {
    return undefined
  }
}

async function get(idTransaction: string) {
  const transaction = await prisma.transaction.findUnique({
    where: {
      id: idTransaction,
    },
  })

  return transaction
}

async function post(transaction: TransactionModelProps) {
  const newTransaction = await prisma.transaction.create({
    data: transaction,
  })

  return newTransaction
}

async function put(idTransaction: string, transaction: PartialTransaction) {
  const editedTransaction = await prisma.transaction.update({
    where: { id: idTransaction },
    data: transaction,
  })

  return editedTransaction
}

function patch(idTransaction: string, transaction: PartialTransaction) {
  const obj = {
    ...transaction,
    id: idTransaction,
  }

  return obj
}

async function remove(idTransaction: string): Promise<boolean> {
  const transaction = await prisma.transaction.delete({
    where: { id: idTransaction },
  })

  return !!transaction
}

export const transactionRepository = {
  list,
  get,
  post,
  put,
  patch,
  remove,
}
