import { TransactionModelProps, TransactionReqProps } from "../../../../../hooks/useTransactions/transaction.types"
import { prisma } from "../../../../../services/prisma"

type PartialTransaction = Partial<TransactionReqProps>

async function list(idUser: string) {
  const transactions = await prisma.transaction.findMany({
    where: {
      idUser,
    },
  })

  return transactions
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
