import { ObjectId } from "mongodb"
import { connectToDatabase } from "libs/mongodb"
import { ITransaction, ITransactionRemove } from "../types/transaction.type"

export async function transactionRepositoryDeleteOne(
  idUser: string,
  idTransaction: ITransactionRemove
): Promise<boolean> {
  try {
    const { db } = await connectToDatabase()

    const { deletedCount } = await db
      .collection<ITransaction>("Transaction")
      .deleteOne({
        _id: new ObjectId(idTransaction),
        idUser,
      })

    return deletedCount > 0
  } catch (error) {
    throw error
  }
}
