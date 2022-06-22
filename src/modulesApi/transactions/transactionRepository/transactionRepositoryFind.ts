import { Filter } from "mongodb"
import { connectToDatabase } from "libs/mongodb"
import { clearUndefinedValuesFromObject } from "utils/clearUndefinedValuesFromObject"
import { ITransaction } from "../types/transaction.type"

interface ITransactionRepositoryFind {
  idUser: string
  dateStartISO?: string
  dateStartNotInclusive?: string
  dateEndISO?: string
  idRecurrence?: string
}

export async function transactionRepositoryFind({
  idUser,
  dateStartISO,
  dateStartNotInclusive,
  dateEndISO,
  idRecurrence,
}: ITransactionRepositoryFind): Promise<ITransaction[]> {
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
