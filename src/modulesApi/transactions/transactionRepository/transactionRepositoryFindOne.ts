import { ObjectId } from "mongodb"
import { connectToDatabase } from "libs/mongodb"
import { ITransaction } from "../types/transaction.type"

export async function transactionRepositoryFindOne(idUser: string, idTransaction: string): Promise<ITransaction | null> {
  try {
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
  } catch (error) {
    throw error
  }
}
