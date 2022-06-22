import { Filter } from "mongodb"
import { connectToDatabase } from "libs/mongodb"
import { clearUndefinedValuesFromObject } from "utils/clearUndefinedValuesFromObject"
import { ITransactionPut, ITransactionPutMany } from "../types/transaction.type"

interface ITransactionRepositoryUpdateMany {
  idUser: string
  idRecurrence: string
  dateStartISO?: string
}

export async function transactionRepositoryUpdateMany(
  transaction: ITransactionPutMany,
  filters: ITransactionRepositoryUpdateMany
) {
  try {
    const { idUser, idRecurrence, dateStartISO } = filters

    const { db } = await connectToDatabase()

    const updateManyFilters = clearUndefinedValuesFromObject<Filter<ITransactionPutMany>>({
      idUser,
      idRecurrence,
      date: {
        $gte: dateStartISO,
      },
    })

    const editedTransactions = await db
      .collection<ITransactionPut>("Transaction")
      .updateMany(
        updateManyFilters,
        {
          $set: transaction,
        }
      )

    return editedTransactions
  } catch (error) {
    throw error
  }
}
