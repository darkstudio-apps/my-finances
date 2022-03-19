import { prisma } from "../../../../../services/prisma"
import { ITransaction, ITransactionForCreate, ITransactionPartial } from "../types/transaction.type"
import { ITransactionGetAllResponse } from "../types/transactionResponse.type"

interface ListProps {
  idUser: string
  dateStartISO?: string
  dateEndISO?: string
  idRecurrence?: string
}

async function list({ idUser, dateStartISO, dateEndISO, idRecurrence }: ListProps): Promise<ITransactionGetAllResponse> {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        idUser,
        date: {
          gte: dateStartISO,
          lte: dateEndISO,
        },
        idRecurrence,
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

async function get(idTransaction: string): Promise<ITransaction | null> {
  // TODO: não permitir que um user acesse uma transaction que não é dele
  const transaction = await prisma.transaction.findUnique({
    where: {
      id: idTransaction,
    },
  }) as ITransaction | null

  return transaction
}

async function post(transaction: ITransactionForCreate) {
  // TODO: não permitir que um user cadastre uma transaction que não é dele
  const newTransaction = await prisma.transaction.create({
    data: transaction,
  })

  return newTransaction
}

async function postMany(transactions: ITransactionForCreate[]) {
  // TODO: não permitir que um user cadastre uma transaction que não é dele
  const newTransactions = await prisma.transaction.createMany({
    data: transactions,
  })

  return newTransactions
}

async function put(idTransaction: string, transaction: ITransactionPartial) {
  // TODO: não permitir que um user edite uma transaction que não é dele
  const editedTransaction = await prisma.transaction.update({
    where: { id: idTransaction },
    data: transaction,
  })

  return editedTransaction
}

async function patch(idTransaction: string, transaction: ITransactionPartial) {
  // TODO: não permitir que um user edite uma transaction que não é dele
  const editedTransaction = await prisma.transaction.update({
    where: { id: idTransaction },
    data: transaction,
  })

  return editedTransaction
}

async function remove(idTransaction: string): Promise<boolean> {
  // TODO: não permitir que um user edite uma transaction que não é dele
  const transaction = await prisma.transaction.delete({
    where: { id: idTransaction },
  })

  return !!transaction
}

async function removeMany(idTransactions: string[]): Promise<boolean> {
  // TODO: não permitir que um user edite uma transaction que não é dele
  const transaction = await prisma.transaction.deleteMany({
    where: {
      id: { in: idTransactions },
    },
  })

  // TODO: retornar um obj com a tipagem de transactionResponse

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
