import { TransactionModelProps, TransactionReqProps } from "../../../../../hooks/useTransactions/transactions.type"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

async function list() {
  const transactions = await prisma.transaction.findMany()
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

async function put(
  idTransaction: string,
  transaction: Partial<TransactionReqProps>
) {
  const editedTransaction = await prisma.transaction.update({
    where: { id: idTransaction },
    data: transaction,
  })
  return editedTransaction
}

function patch(
  idTransaction: string,
  transaction: Partial<TransactionReqProps>
): Partial<TransactionReqProps> | undefined {
  const currentTransaction = get(idTransaction)

  if (!currentTransaction) return currentTransaction

  const editedTransaction = {
    ...currentTransaction,
    ...transaction,
  }

  return editedTransaction
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
