import { connectToDatabase } from "libs/mongodb"
import { prisma } from "libs/prisma"
import {
  ITransaction,
  ITransactionPatch,
  ITransactionPost,
  ITransactionPut,
  ITransactionPutMany,
  ITransactionRemove,
  ITransactionRemoveMany,
} from "../types/transaction.type"

interface IList {
  idUser: string
  dateStartISO?: string
  dateStartNotInclusive?: string
  dateEndISO?: string
  idRecurrence?: string
}

async function list({ idUser, dateStartISO, dateStartNotInclusive, dateEndISO, idRecurrence }: IList): Promise<ITransaction[]> {
  try {
    const { db } = await connectToDatabase()

    const transactions = await db
      .collection<ITransaction>("Transaction")
      .find({
        idUser,
        idRecurrence: idRecurrence || new RegExp(""),
        date: {
          $gte: dateStartISO || "",
          $gt: dateStartNotInclusive || "",
          $lte: dateEndISO || "",
        },
      })
      .sort({ date: 1 })
      .toArray()

    const mappedTransactions = transactions.map((t) => {
      const mappedTransaction: ITransaction = {
        id: t._id.toString(),
        idUser: t.idUser,
        title: t.title,
        amount: t.amount,
        date: t.date,
        status: t.status,
        idRecurrence: t.idRecurrence,
        typeRecurrence: t.typeRecurrence,
        isRecurrence: t.isRecurrence,
        installments: t.installments,
        type: t.type,
      }
      return mappedTransaction
    })

    return mappedTransactions
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

async function post(transaction: ITransactionPost) {
  // TODO: não permitir que um user cadastre uma transaction que não é dele
  const newTransaction = await prisma.transaction.create({
    data: transaction,
  })

  return newTransaction
}

async function postMany(transactions: ITransactionPost[]) {
  // TODO: não permitir que um user cadastre uma transaction que não é dele
  const newTransactions = await prisma.transaction.createMany({
    data: transactions,
  })

  return newTransactions
}

async function put(idTransaction: string, transaction: ITransactionPut) {
  // TODO: não permitir que um user edite uma transaction que não é dele
  const editedTransaction = await prisma.transaction.update({
    where: { id: idTransaction },
    data: transaction,
  })

  return editedTransaction
}

interface IPutMany {
  idUser: string
  idRecurrence: string
  dateStartISO?: string
}

async function putMany(transaction: ITransactionPutMany, { idUser, idRecurrence, dateStartISO }: IPutMany) {
  try {
    const editedTransactions = await prisma.transaction.updateMany({
      where: {
        idUser,
        date: {
          gte: dateStartISO,
        },
        idRecurrence,
      },
      data: transaction,
    })

    return editedTransactions
  } catch (error) {
    return undefined
  }
}

// TODO: Talvez receber um obj como param, fica mais facil pra tipar
async function patch(idTransaction: string, transaction: ITransactionPatch) {
  // TODO: não permitir que um user edite uma transaction que não é dele
  const editedTransaction = await prisma.transaction.update({
    where: { id: idTransaction },
    data: transaction,
  })

  return editedTransaction
}

async function remove(idTransaction: ITransactionRemove): Promise<boolean> {
  // TODO: não permitir que um user edite uma transaction que não é dele
  const transaction = await prisma.transaction.delete({
    where: { id: idTransaction },
  })

  return !!transaction
}

async function removeMany(idTransactions: ITransactionRemoveMany): Promise<boolean> {
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
  putMany,
  patch,
  remove,
  removeMany,
}
