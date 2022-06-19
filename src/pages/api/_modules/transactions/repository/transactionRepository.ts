import { connectToDatabase } from "libs/mongodb"
import { prisma } from "libs/prisma"
import { Filter, ObjectId } from "mongodb"
import { clearUndefinedValuesFromObject } from "utils/clearUndefinedValuesFromObject"
import {
  ITransaction,
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

    const filters = clearUndefinedValuesFromObject<Filter<ITransaction>>({
      idUser,
      idRecurrence,
      date: {
        $gte: dateStartISO,
        $gt: dateStartNotInclusive,
        $lte: dateEndISO,
      },
    })

    const transactions = await db
      .collection<ITransaction>("Transaction")
      .find(filters)
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

async function get(idUser: string, idTransaction: string): Promise<ITransaction | null> {
  const { db } = await connectToDatabase()

  const transaction = await db
    .collection<ITransaction>("Transaction")
    .findOne({
      _id: new ObjectId(idTransaction),
      idUser,
    })

  if (!transaction) return null

  const mappedTransaction: ITransaction = {
    id: transaction._id.toString(),
    idUser: transaction.idUser,
    title: transaction.title,
    amount: transaction.amount,
    date: transaction.date,
    status: transaction.status,
    idRecurrence: transaction.idRecurrence,
    typeRecurrence: transaction.typeRecurrence,
    isRecurrence: transaction.isRecurrence,
    installments: transaction.installments,
    type: transaction.type,
  }

  return mappedTransaction
}

async function post(idUser: string, transaction: ITransactionPost) {
  try {
    if (idUser !== transaction.idUser) throw new Error("ação não permitida!")

    const { db } = await connectToDatabase()

    const newTransaction = await db
      .collection<ITransactionPost>("Transaction")
      .insertOne(transaction)

    return newTransaction
  } catch (error) {
    throw error
  }
}

async function postMany(idUser: string, transactions: ITransactionPost[]) {
  try {
    if (idUser !== transactions[0].idUser) throw new Error("ação não permitida!")

    const { db } = await connectToDatabase()

    const newTransactions = await db
      .collection<ITransactionPost>("Transaction")
      .insertMany(transactions)

    return newTransactions
  } catch (error) {
    throw error
  }
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

async function putMany(transaction: ITransactionPutMany, filters: IPutMany) {
  try {
    const { idUser, idRecurrence, dateStartISO } = filters

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

async function remove(idUser: string, idTransaction: ITransactionRemove): Promise<boolean> {
  try {
    const { db } = await connectToDatabase()

    const { deletedCount } = await db
      .collection("Transaction")
      .deleteOne({
        _id: new ObjectId(idTransaction),
        idUser,
      })

    return deletedCount > 0
  } catch (error) {
    throw error
  }
}

async function removeMany(idUser: string, idTransactions: ITransactionRemoveMany): Promise<boolean> {
  try {
    const { db } = await connectToDatabase()

    const transactionsObjectId = idTransactions.map(id => new ObjectId(id))

    const { deletedCount } = await db
      .collection<ITransaction>("Transaction")
      .deleteMany({
        _id: { $in: transactionsObjectId },
        idUser,
      })

    return deletedCount > 0
  } catch (error) {
    throw error
  }
}

export const transactionRepository = {
  list,
  get,
  post,
  postMany,
  put,
  putMany,
  remove,
  removeMany,
}
