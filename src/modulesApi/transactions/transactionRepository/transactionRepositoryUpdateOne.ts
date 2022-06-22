import { ObjectId } from "mongodb"
import { connectToDatabase } from "libs/mongodb"
import { ITransactionPut } from "../types/transaction.type"

export async function transactionRepositoryUpdateOne(
  idUser: string,
  idTransaction: string,
  transaction: ITransactionPut
) {
  try {
    const { db } = await connectToDatabase()

    const editedTransaction = await db
      .collection<ITransactionPut>("Transaction")
      .updateOne(
        {
          _id: new ObjectId(idTransaction),
          idUser,
        },
        {
          $set: transaction,
        }
      )

    return editedTransaction
  } catch (error) {
    throw error
  }
}
