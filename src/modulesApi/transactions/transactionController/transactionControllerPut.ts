import { NextApiResponse } from "next"
import { transactionServicePut } from "../transactionService"
import { ITransactionRequest } from "../types/transactionRequest.type"

export async function transactionControllerPut(
  req: ITransactionRequest,
  res: NextApiResponse
) {
  try {
    const { idUser, id, action } = req.query
    const transaction = req.body

    const response = await transactionServicePut({ idUser, id, action, transaction })

    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}
