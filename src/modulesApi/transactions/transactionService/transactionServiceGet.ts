import { transactionRepositoryFindOne } from "../transactionRepository"

export async function transactionServiceGet(idUser: string, idTransaction: string) {
  const transaction = await transactionRepositoryFindOne(idUser, idTransaction)

  // TODO: retornar um obj com a tipagem de transactionResponse
  const transactionData = {
    transaction,
  }

  return transactionData
}
