import { NextApiResponse } from "next"
import { transactionServiceGet } from "../transactionService"
import { ITransactionRequest } from "../types/transactionRequest.type"

export async function transactionControllerGet(
  req: ITransactionRequest,
  res: NextApiResponse
) {
  try {
    const { idUser, id } = req.query

    const response = await transactionServiceGet(idUser, id)

    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}
