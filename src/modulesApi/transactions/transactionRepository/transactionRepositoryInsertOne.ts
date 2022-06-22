import { connectToDatabase } from "libs/mongodb"
import { ITransactionPost } from "../types/transaction.type"

export async function transactionRepositoryInsertOne(
  idUser: string,
  transaction: ITransactionPost
) {
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
