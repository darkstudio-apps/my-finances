import { connectToDatabase } from "libs/mongodb"
import { ITransactionPost } from "../types/transaction.type"

export async function transactionRepositoryInsertMany(
  idUser: string,
  transactions: ITransactionPost[]
) {
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
