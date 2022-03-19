import { prisma } from "../../../../../services/prisma"
import { ITransactionForCreate, ITransactionPartial } from "../types/transaction.type"

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
    }) as ITransaction[] | undefined

    const transactionsData: ITransactionGetAllResponse = {
      search: {
        dateStart: dateStartISO || "",
        dateEnd: dateEndISO || "",
      },
      length: transactions?.length || 0,
      data: transactions || [],
    }

    return transactionsData
  } catch (error) {
    throw error
  }
}

async function get(idTransaction: string) {
  // TODO: não permitir que um user acesse uma transaction que não é dele
  const transaction = await prisma.transaction.findUnique({
    where: {
      id: idTransaction,
    },
  })

  return transaction
}

async function post(transaction: ITransactionForCreate) {
  const newTransaction = await prisma.transaction.create({
    data: transaction,
  })

  return newTransaction
}

async function postMany(transactions: ITransactionForCreate[]) {
  const newTransactions = await prisma.transaction.createMany({
    data: transactions,
  })

  return newTransactions
}

async function put(idTransaction: string, transaction: ITransactionPartial) {
  const editedTransaction = await prisma.transaction.update({
    where: { id: idTransaction },
    data: transaction,
  })

  return editedTransaction
}

function patch(idTransaction: string, transaction: ITransactionPartial) {
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

async function removeMany(idTransactions: string[]): Promise<boolean> {
  const transaction = await prisma.transaction.deleteMany({
    where: {
      id: { in: idTransactions },
    },
  })

  return !!transaction
}

export const transactionRepository = {
  list,
  get,
  post,
  postMany,
  put,
  patch,
  remove,
  removeMany,
}
