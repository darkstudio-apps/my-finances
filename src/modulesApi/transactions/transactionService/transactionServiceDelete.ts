import {
  transactionRepositoryDeleteMany,
  transactionRepositoryDeleteOne,
  transactionRepositoryFind,
  transactionRepositoryFindOne,
} from "../transactionRepository"
import { ITransaction } from "../types/transaction.type"
import { ITransactionServiceRemove } from "../types/transactionService.type"
import { ITransactionRequestQueryActionParam } from "../types/transactionRequest.type"

const generateFiltersListRemove = (
  transaction: ITransaction,
  action?: ITransactionRequestQueryActionParam
) => {
  const { id, idUser, idRecurrence, date } = transaction

  const dateStartISO = date

  if (action === "all") return { idUser, idRecurrence }

  if (action === "next") return { idUser, idRecurrence, dateStartISO }

  return { idUser, id }
}

export async function transactionServiceDelete({
  idUser,
  id,
  action,
}: ITransactionServiceRemove): Promise<boolean> {
  if (!action || action === "current") {
    const responseRemove = await transactionRepositoryDeleteOne(idUser, id)
    return responseRemove
  }

  const transaction = await transactionRepositoryFindOne(idUser, id)

  if (!transaction) throw new Error("transaction not found")

  const filtersList = generateFiltersListRemove(transaction, action)
  const transactions = await transactionRepositoryFind(filtersList)

  // TODO: quando não tiver dados, retornar um obj diferente ou um erro?
  // {
  //   success: false,
  //   message: "transactions not found",
  // }
  if (!transactions || !transactions.length) return false

  const idTransactions = transactions.map(transaction => transaction.id)

  const respondeMany = await transactionRepositoryDeleteMany(idUser, idTransactions)

  return !!respondeMany
}
