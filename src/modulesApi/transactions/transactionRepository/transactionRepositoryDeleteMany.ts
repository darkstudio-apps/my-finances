import { ObjectId } from "mongodb"
import { connectToDatabase } from "libs/mongodb"
import { ITransaction, ITransactionRemoveMany } from "../types/transaction.type"

export async function transactionRepositoryDeleteMany(
  idUser: string,
  idTransactions: ITransactionRemoveMany
): Promise<boolean> {
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
