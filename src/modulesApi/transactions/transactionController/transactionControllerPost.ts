import { NextApiResponse } from "next"
import { transactionServicePost } from "../transactionService"
import { ITransactionRequestRoot } from "../types/transactionRequest.type"

export async function transactionControllerPost(
  req: ITransactionRequestRoot,
  res: NextApiResponse
) {
  try {
    const { body } = req
    const { idUser } = req.query

    const response = await transactionServicePost(idUser, body)

    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}
